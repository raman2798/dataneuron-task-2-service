import { Document, FilterQuery, Model, Schema } from 'mongoose';
import { IOptionsWithPopulate } from './index';
import { IPaginationResult } from '../models/plugins/interfaces';

export interface IUser extends Document {
  email: string;
  name: IName;
  isActive: boolean;
  createdBy: Schema.Types.ObjectId;
  updatedBy: Schema.Types.ObjectId;
}

export interface IName {
  first: string;
  last: string;
}

export interface IUserModel extends Model<IUser> {
  isEmailTaken(email: string, excludeUserId?: string): Promise<boolean>;
  paginationAndDownload(options: IOptionsWithPopulate, query?: FilterQuery<Document>): Promise<IPaginationResult<Document>>;
}
