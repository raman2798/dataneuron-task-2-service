/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IResult {
  [key: string]: any;
}

export interface IResponse {
  message: string;
  statusCode: number;
  result?: IResult;
}

export interface ExpirationTypes {
  d: 'days';
  h: 'hours';
  m: 'minutes';
}
