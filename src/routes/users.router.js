const Joi = require('joi');
const userHandler = require('../handlers/users.handler');

module.exports = [
  {
    path: '/users',
    method: 'GET',
    handler: userHandler.getUser,
    options: {
      tags: ['api'],
      description: 'Get user',
      validate: {
        headers: Joi.object({
          authorization: Joi.string().required().description('Bearer YOUR_TOKEN'),
        }).unknown(),
      },
      response: {
        schema: Joi.object({
          email: Joi.string().email(),
          photo: Joi.string().uri(),
          name: Joi.string(),
          title: Joi.string(),
        }).unknown(),
      },
    },
  },
  {
    path: '/users',
    method: 'PUT',
    handler: userHandler.updateProfile,
    options: {
      tags: ['api'],
      description: 'Update profile',
      validate: {
        payload: Joi.object({
          email: Joi.string().email().description('Your active email'),
          photo: Joi.string().uri().description('URI of your profile photo'),
          name: Joi.string().description('Your full name'),
          title: Joi.string().description('Your job title'),
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
];
