export type MovieSearchParams = {
  sort?: 'id' | 'title' | 'year';
  order?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
  title?: string;
  actor?: string;
  search?: string;
};
