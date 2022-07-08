const Users = require('../models/Users');

module.exports = {
  name: 'jwt',
  schema: 'jwt',
  options: {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: 'urn:audience:api',
      iss: 'urn:issuer:api',
      sub: false,
    },
    validate: async (artifacts) => {
      const account = await Users.findById(artifacts.decoded.payload.userId);
      if (!account) return { isValid: false };
      return {
        isValid: true,
        credentials: { userId: artifacts.decoded.payload.userId },
      };
    },
  },
};
