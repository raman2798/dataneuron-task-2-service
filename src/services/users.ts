import { NOT_FOUND } from 'http-status';
import { assign, get, isEmpty } from 'lodash';
import { Document, FilterQuery } from 'mongoose';
import { UserModel } from '../models';
import { IOptions } from '../interfaces';
import { IUser } from '../interfaces/users';
import { IPaginationResult } from '../models/plugins/interfaces';

// Create a user
const create = async (createBody: IUser): Promise<IUser> => {
  const isEmailTaken = await UserModel.isEmailTaken(createBody.email);

  if (isEmailTaken) {
    throw { message: 'Email already taken' };
  }

  const user = await UserModel.create(createBody);

  return user;
};

// Get all users
const getAllUsers = async (options: IOptions, query: FilterQuery<Document> = {}): Promise<IUser[] | IPaginationResult<Document>> => {
  const users = await UserModel.paginationAndDownload(options, query);

  return users;
};

// Get user by query
const getUserByQuery = async (query: FilterQuery<Document>): Promise<IUser> => {
  const user = await UserModel.find(query);

  if (isEmpty(user)) {
    throw { statusCode: NOT_FOUND, message: 'No user found' };
  }

  return user[0];
};

// Get user by email
const getUserByEmail = async (email: string): Promise<IUser> => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw { statusCode: NOT_FOUND, message: 'No user found with this email' };
  }

  return user;
};

// Update user by userId or email
const updateUserByQuery = async (query: FilterQuery<Document>, updateBody: Partial<IUser>): Promise<IUser> => {
  const user = await getUserByQuery(query);

  const userId: string = get(user, 'id', '');

  const email = get(updateBody, 'email', '');

  if (email) {
    const isEmailTaken = await UserModel.isEmailTaken(email, userId);

    if (email && isEmailTaken) {
      throw { message: 'Email already taken' };
    }
  }

  assign(user, updateBody);

  await user.save();

  return user;
};

// Get user counts
const getUserCounts = async (): Promise<number> => {
  const userCounts = await UserModel.countDocuments();

  return userCounts;
};

export { create, updateUserByQuery, getAllUsers, getUserByQuery, getUserByEmail, getUserCounts };
