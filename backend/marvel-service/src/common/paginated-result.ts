/**
 * Generic paginated result wrapper for API responses.
 */
export interface PaginatedResult<T> {
  items: T;
  page: number;
  pageSize: number;
  totalCount: number;
}
