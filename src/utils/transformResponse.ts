import { OK } from 'http-status';
import { v4 as uuidv4 } from 'uuid';
import { appConfiguration } from '../config';
import { IResponse } from './interfaces';

const { appVersion } = appConfiguration;

const transformResponse = (payload: Partial<IResponse>) => {
  const { message = '', statusCode = OK, result = {} } = payload;

  return {
    error: message ? { message } : {},
    ets: Date.now(),
    resmsgid: `${uuidv4()}`,
    result,
    statusCode,
    version: appVersion,
  };
};

export default transformResponse;
