import { NextFunction, Request, Response } from 'express';
import { floor, get, isEqual, toNumber } from 'lodash';
import { userService } from '../services';
import { transformErrorUtils, transformResponseUtils } from '../utils';
import { IOptionsWithPopulate } from '../interfaces';
import { IUser } from '../interfaces/users';

// Counters for tracking API calls
let addCount = 0;
let updateCount = 0;

const { create, updateUserByQuery, getAllUsers, getUserByQuery, getUserCounts } = userService;

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createBody = {
      name: {
        first: get(req, 'body.firstName'),
        last: get(req, 'body.lastName'),
      },
      email: get(req, 'body.email'),
      createdBy: get(req, 'user.id'),
    } as unknown as IUser;

    await create(createBody);

    // Increment add count
    addCount++;

    res.json(
      transformResponseUtils({
        result: {},
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { userId },
    } = req;

    const updateBody = {
      name: {
        first: get(req, 'body.firstName'),
        last: get(req, 'body.lastName'),
      },
      email: get(req, 'body.email'),
      updatedBy: get(req, 'user.id'),
    } as Partial<IUser>;

    const query = { _id: userId };

    await updateUserByQuery(query, updateBody);

    // Increment update count
    updateCount++;

    res.json(
      transformResponseUtils({
        result: {},
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

const readAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      query: { page, limit, isDownload },
    } = req;

    const options: IOptionsWithPopulate = {
      page: floor(toNumber(page)),
      limit: floor(toNumber(limit)),
      isDownload: isEqual(isDownload, 'true'),
      includedFields: ['name', 'id', 'email'],
    };

    const users = await getAllUsers(options);

    res.json(
      transformResponseUtils({
        result: users,
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

const readById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      params: { userId },
    } = req;

    const query = { _id: userId };

    const user = await getUserByQuery(query);

    res.json(
      transformResponseUtils({
        result: {
          data: user,
        },
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

const userSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      query: { page, limit },
    } = req;

    const options: IOptionsWithPopulate = {
      page: floor(toNumber(page)),
      limit: floor(toNumber(limit)),
      includedFields: ['name', 'id', 'email'],
    };

    const searchValue = get(req, 'query.searchValue') as string;

    // Create a regular expression to match the search pattern
    const regex = new RegExp(searchValue, 'i'); // 'i' flag for case-insensitive search

    const query = {
      $or: [{ 'name.first': regex }, { 'name.last': regex }, { email: regex }],
    };

    const users = await getAllUsers(options, query);

    res.json(
      transformResponseUtils({
        result: {
          ...users,
        },
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

const userCounts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUserCounts();

    res.json(
      transformResponseUtils({
        result: {
          users,
          addAPICalls: addCount,
          updateAPICalls: updateCount,
        },
      }),
    );
  } catch (error) {
    next(transformErrorUtils(error));
  }
};

export { createUser, updateById, readAllUsers, readById, userSearch, userCounts };
