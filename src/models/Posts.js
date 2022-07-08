const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, index: true },
    category: { type: String, index: true },
    author: String,
    photo: String,
    content: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Posts', postSchema);
