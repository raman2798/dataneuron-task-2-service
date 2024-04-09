/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object: Record<string, any>, keys: string[]): Record<string, any> => {
  const pickedObject: Record<string, any> = {};

  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      pickedObject[`${key}`] = object[`${key}`];
    }
  });

  return pickedObject;
};

export { pick };
