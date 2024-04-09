import { BAD_REQUEST } from 'http-status';
import { get, isString } from 'lodash';
import { IError, IErrorResponse } from '../interfaces';

const transformError = (error: unknown): IErrorResponse => {
  let err;
  let statusCode: number;

  // Use optional chaining to safely access the 'message' property.
  if (get(error, 'response.data')) {
    err = {
      message: get(error, 'response.data.message'),
    };

    statusCode = get(error, 'response.status', BAD_REQUEST);
  } else if (get(error, 'message')) {
    err = error as IError;

    statusCode = get(error, 'statusCode', BAD_REQUEST);
  } else {
    err = new Error(JSON.stringify(error));

    statusCode = get(error, 'statusCode', BAD_REQUEST);
  }

  return {
    statusCode,
    message: isString(err.message) ? err.message : JSON.stringify(err.message),
  };
};

export default transformError;
