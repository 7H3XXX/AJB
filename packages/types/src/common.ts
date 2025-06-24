export interface ApiResponse<T> {
  statusCode: number;
  status: boolean;
  message: string;
  data: T;
}

export interface PagindatedApiData<T> {
  items: T[];
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
