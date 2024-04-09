import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status';
import Joi, { Schema } from 'joi';
import { get, map } from 'lodash';
import { pickUtils } from '../utils';
import { IValidate } from './interfaces';

const { pick } = pickUtils;

/**
 * This function validates the request data against the provided schema
 * @param schema - The Joi schema to validate against
 */
export const validate = (schema: Record<string, Schema>) => (req: Request, res: Response, next: NextFunction) => {
  const validSchema: Record<string, Schema> = pick(schema, ['headers', 'params', 'query', 'body']);

  // Pick only the relevant properties from the request object
  const object: Record<string, unknown> = pick(req, Object.keys(validSchema));

  // Check if 'headers' is specified in the schema
  if (validSchema.headers) {
    const { headers } = req;

    object.headers = headers as Record<string, unknown>;
  }

  // Compile and validate the object against the schema
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object) as IValidate;

  // If there are validation errors, construct an error message
  if (error) {
    const errorMessage: string = map(get(error, 'details'), 'message').join(', ');

    // Pass the error to the error handler middleware
    return next({ statusCode: BAD_REQUEST, message: errorMessage });
  }

  // Assign the validated values to the request object
  Object.assign(req, value);

  // Proceed to the next middleware
  return next();
};
