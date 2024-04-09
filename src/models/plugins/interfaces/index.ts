import { Document } from 'mongoose';

// Define a type for the pagination result
export interface IPaginationResult<T extends Document> {
  data: T[] | T;
  totalResults: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}
