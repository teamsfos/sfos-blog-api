const Users = require('../models/Users');
module.exports = {
  updateProfile: async (request, h) => {
    const userId = request.auth.credentials.userId;
    const userRes = await Users.updateOne({ _id: userId }, request.payload);
    return h.response({ updated: Boolean(userRes.modifiedCount) });
  },
  getUser: async (request, h) => {
    const userId = request.auth.credentials.userId;
    const user = await Users.findById(userId).select('-password -_id');
    return h.response(user);
  },
};
