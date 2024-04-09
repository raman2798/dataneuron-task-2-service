/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Document, Schema } from 'mongoose';
import { get, set, unset } from 'lodash';

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, and any path that has private: true
 *  - replaces _id with id
 */
const toJSON = (schema: Schema) => {
  schema.set('toJSON', {
    transform: (doc: Document, ret: any) => {
      // Remove any paths with private: true
      for (const path in schema.paths) {
        if (Object.prototype.hasOwnProperty.call(schema.paths, path)) {
          if (get(schema.paths, `${path}.options.private`)) {
            unset(ret, path);
          }
        }
      }

      // Remove the __v field
      unset(ret, '__v');

      // Replace _id with id
      set(ret, 'id', String(get(ret, '_id')));

      unset(ret, '_id');
    },
  });
};

export default toJSON;
