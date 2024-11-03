export interface Paginated<T> extends Pagination {
  data: T[];
  nextPage?: number;
  previousPage?: number;
}
export interface Pagination {
  page: number;
  limit: number;
}
