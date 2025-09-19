import { ApiErrorCode } from './error.codes';

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
  errorCode?: ApiErrorCode;
}

export interface PagindatedApiData<T> {
  items: T[];
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}
