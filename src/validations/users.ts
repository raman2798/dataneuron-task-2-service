import Joi from 'joi';
import { merge } from 'lodash';
import { customObjectId } from './custom';

const baseSchema = {
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string().trim(),
  isActive: Joi.boolean(),
  id: Joi.string().trim(),
  createdAt: Joi.string().trim(),
  createdBy: Joi.string().trim(),
  updatedAt: Joi.string().trim(),
  updatedBy: Joi.string().trim(),
};

const create = {
  body: Joi.object().keys(
    merge({}, baseSchema, {
      firstName: baseSchema.firstName.required(),
      lastName: baseSchema.lastName.required(),
      email: baseSchema.email.required(),
    }),
  ),
};

const update = {
  params: Joi.object().keys({
    userId: customObjectId.required(),
  }),
  body: Joi.object().keys(baseSchema),
};

const getUserById = {
  params: Joi.object().keys({
    userId: customObjectId.required(),
  }),
};

export { create, update, getUserById };
