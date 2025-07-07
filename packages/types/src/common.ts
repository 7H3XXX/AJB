export interface ApiResponse<T> {
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
