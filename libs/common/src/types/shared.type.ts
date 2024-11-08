export interface PaginatedWithOffset<T> extends PaginationWithOffset {
  data: T[];
  nextPage?: number;
  previousPage?: number;
}
export interface PaginationWithOffset {
  page: number;
  limit: number;
}
export interface PaginatedWithSeekMethod<T> {
  data: T[];
  limit: number;
}
export interface PaginationWithSeekMethod {
  previousCreatedAt?: string;
  nextCreatedAt?: string;
  limit: number;
}
