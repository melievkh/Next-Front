export interface ApiErrorResponse {
  error: string;
  statusCode: number;
  message: string | string[];
}

export interface ApiSuccessResponse<T> {
  result: T;
  success: boolean;
}
