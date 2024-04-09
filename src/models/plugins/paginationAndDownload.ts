/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NOT_FOUND } from 'http-status';
import { Document, FilterQuery, Model, Schema } from 'mongoose';
import { defaultTo, floor, get, isEmpty, isEqual, reduce, set, size, startCase, toLower, toNumber } from 'lodash';
import { IOptionsWithPopulate } from '../../interfaces';
import { IPaginationResult } from './interfaces';

const isEmptyCheck = (results: Document[], modelName: string) => {
  if (isEmpty(results)) {
    throw { statusCode: NOT_FOUND, message: `No data found in ${startCase(toLower(modelName))}` };
  }

  return;
};

const paginationAndDownload = (schema: Schema) => {
  schema.statics.paginationAndDownload = async function (options: IOptionsWithPopulate, query: FilterQuery<Document> = {}): Promise<IPaginationResult<Document>> {
    const model = this as Model<Document>;

    // Default to isDownload of false if not provided
    const isDownload = get(options, 'isDownload', false);

    // Default to limit of 10 if not provided
    const limit = defaultTo(floor(toNumber(get(options, 'limit', 10))), 10);

    // Default to page 1 if not provided
    const page = defaultTo(floor(toNumber(get(options, 'page', 1))), 1);

    // Calculate the skip value based on the page and limit
    const skip = (page - 1) * limit;

    // Include specific fields
    const includedFields = reduce(get(options, 'includedFields', []), (acc, field) => set(acc, field, 1), {});

    // Concatenate both include and exclude fields
    const selectedFields = isEmpty(includedFields) ? {} : includedFields;

    // Populate
    const populateFields = get(options, 'populateFields', []);

    const count = await model.countDocuments(query);

    const totalPages = Math.ceil(count / limit);

    let resultsQuery = model.find(query, selectedFields).populate(populateFields);

    if (isDownload) {
      const results = await resultsQuery;

      isEmptyCheck(results, model.modelName);

      return {
        data: results,
        totalResults: count,
      };
    } else {
      resultsQuery = resultsQuery.skip(skip).limit(limit);

      const results = await resultsQuery;

      isEmptyCheck(results, model.modelName);

      const data = isEqual(size(results), 1) ? results[0] : results;

      return {
        data,
        page,
        limit,
        totalPages,
        totalResults: count,
      };
    }
  };
};

export default paginationAndDownload;
