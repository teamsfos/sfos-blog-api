const Posts = require('../models/Posts');

module.exports = {
  createPost: async (request, h) => {
    const postData = request.payload;
    const res = await Posts.create(postData);
    return h.response({ created: Boolean(res.id), postId: res.id });
  },
  deletePost: async (request, h) => {
    const { postId } = request.query;
    const res = await Posts.deleteOne({ _id: postId });
    return h.response({ deleted: Boolean(res.deletedCount) });
  },
  updatePost: async (request, h) => {
    const { postId } = request.query;
    const newPostData = request.payload;
    const res = await Posts.updateOne({ _id: postId }, newPostData);
    return h.response({ updated: Boolean(res.modifiedCount) });
  },
  getPosts: async (request, h) => {
    const postData = Object.assign(request.query, request.payload);
    const { postId } = postData;
    const { title, author, category, limit = 10, offset } = postData;
    const path = {};
    category && category !== 'all' && (path.category = category);
    title && (path.title = { $regex: title });
    author && (path.author = author);
    postId && (path._id = postId);
    const res = await Posts.find(path).limit(limit).skip(offset);
    return h.response(res);
  },
};
