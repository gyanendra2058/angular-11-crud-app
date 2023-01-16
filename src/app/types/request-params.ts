export type RequestParams = {
  queryParams?: QueryParams;
  payload: Payload;
};

type QueryParams = {
  page: number;
  size: number;
  sortOrder: 'ASC' | 'DESC';
  sortField: string;
};

type Payload = {
  defaultFilterSet: boolean;
  filters: any[];
  name: 'ALERT' | 'CASES';
};
