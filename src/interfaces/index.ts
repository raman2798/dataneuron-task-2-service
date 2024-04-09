export interface IErrorResponse {
  statusCode: number;
  message: string;
  isOperational?: boolean;
}

export interface IError {
  statusCode?: number;
  message?: string;
}

export interface IOptions {
  page?: number | string;
  limit?: number | string;
  isDownload?: boolean;
}

export interface IOptionsWithPopulate extends IOptions {
  includedFields?: string[];
  populateFields?: IPopulate[];
}

export interface IPopulate {
  path: string;
  select?: string[];
  match?: object;
}
