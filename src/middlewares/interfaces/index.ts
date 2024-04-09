import { ValidationError } from 'joi';

export interface IValidate {
  value: unknown;
  error: ValidationError;
}
