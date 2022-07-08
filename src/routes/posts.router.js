const Joi = require('joi');
const postsHandler = require('../handlers/posts.handler');

module.exports = [
  {
    path: '/posts',
    method: 'GET',
    handler: postsHandler.getPosts,
    options: {
      auth: false,
      tags: ['api'],
      description: 'Get All posts or specific post',
      validate: {
        query: Joi.object({
          postId: Joi.string(),
          title: Joi.string(),
          category: Joi.string(),
          author: Joi.string(),
          limit: Joi.number(),
          offset: Joi.number(),
        }),
      },
      response: {
        schema: Joi.array().items(
          Joi.object({
            title: Joi.string(),
            category: Joi.string(),
            author: Joi.string(),
            photo: Joi.string().uri(),
            content: Joi.string(),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
          }).unknown()
        ),
      },
    },
  },
  {
    path: '/posts',
    method: 'PUT',
    handler: postsHandler.updatePost,
    options: {
      tags: ['api'],
      description: 'Update a post',
      validate: {
        query: Joi.object({
          postId: Joi.string().required(),
        }),
        payload: Joi.object({
          title: Joi.string(),
          category: Joi.string(),
          author: Joi.string(),
          photo: Joi.string().allow('').uri(),
          content: Joi.string(),
        }),
        headers: Joi.object({
          authorization: Joi.string().required().description('Bearer YOUR_TOKEN'),
        }).unknown(),
      },
      response: {
        schema: Joi.object({
          updated: Joi.boolean(),
        }),
      },
    },
  },
  {
    path: '/posts',
    method: 'POST',
    handler: postsHandler.createPost,
    options: {
      tags: ['api'],
      description: 'Create a post',
      validate: {
        payload: Joi.object({
          title: Joi.string().required(),
          category: Joi.string().required(),
          author: Joi.string().required(),
          photo: Joi.string().allow('').uri(),
          content: Joi.string().required(),
        }),
        headers: Joi.object({
          authorization: Joi.string().required().description('Bearer YOUR_TOKEN'),
        }).unknown(),
      },
      response: {
        schema: Joi.object({
          created: Joi.boolean(),
          postId: Joi.string(),
        }),
      },
    },
  },
  {
    path: '/posts',
    method: 'DELETE',
    handler: postsHandler.deletePost,
    options: {
      tags: ['api'],
      description: 'Delete a post',
      validate: {
        query: Joi.object({
          postId: Joi.string().required(),
        }),
        headers: Joi.object({
          authorization: Joi.string().required().description('Bearer YOUR_TOKEN'),
        }).unknown(),
      },
      response: {
        schema: Joi.object({
          deleted: Joi.boolean(),
        }),
      },
    },
  },
];
