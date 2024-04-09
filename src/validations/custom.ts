import Joi, { CustomHelpers } from 'joi';

const objectId = (value: string, helpers: CustomHelpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message({
      custom: `"{#label}" must be a valid id`,
    });
  }

  return value;
};

const customObjectId = Joi.custom(objectId);

export { customObjectId };
