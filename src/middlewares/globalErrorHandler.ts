/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { get } from 'lodash';
import { appConfiguration, loggerConfiguration } from '../config';
import { transformResponseUtils } from '../utils';
import { IErrorResponse } from '../interfaces';

const { env } = appConfiguration;

// Define the shape of the error response
const globalErrorHandler = (error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
  // Initialize variables statusCode and message with error properties
  let statusCode = get(error, 'statusCode', httpStatus.INTERNAL_SERVER_ERROR);

  let message = get(error, 'message', 'Internal Server Error');

  // Check if the environment is production and if the error is not operational
  if (env === 'production' && !error.isOperational) {
    // If so, set statusCode to INTERNAL_SERVER_ERROR and message to the corresponding HTTP status message
    statusCode = get(httpStatus, 'INTERNAL_SERVER_ERROR');

    message = 'Internal Server Error';
  }

  loggerConfiguration.error('Error:', error);

  // Set the response status code and send the message as response
  res.status(statusCode).json(
    transformResponseUtils({
      statusCode,
      message,
    }),
  );
};

export default globalErrorHandler;
