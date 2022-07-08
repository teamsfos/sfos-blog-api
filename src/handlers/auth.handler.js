const Users = require('../models/Users');
const Boom = require('@hapi/boom');
const jwt = require('@hapi/jwt');
const bcrypt = require('../utils/bcrypt');

module.exports = {
  login: async (request, h) => {
    const { email, password } = request.payload;
    const account = await Users.findOne({ email });
    if (!account || !(await bcrypt.compare(password, account.password))) {
      return Boom.unauthorized();
    }
    const token = jwt.token.generate(
      { userId: account.id, aud: 'urn:audience:api', iss: 'urn:issuer:api' },
      process.env.JWT_SECRET
    );
    return h.response({
      token,
      name: account.name,
      photo: account.photo,
      title: account.title,
      email: account.email,
    });
  },
  register: async (request, h) => {
    if (request.payload && Array.isArray(request.payload)) return Boom.badData();
    const account = await (await Users.create(request.payload)).toJSON();
    delete account.password;
    delete account._id;
    return h.response(account);
  },
  logout: async (request, h) => {
    const account = await Users.deleteOne({ _id: request.auth.credentials.userId });
    return h.response({ deleted: Boolean(account.deletedCount) });
  },
};
