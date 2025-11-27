// Generic API response type
export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  statusCode: number;
}

// Helper function to create success response
export const createSuccessResponse = <T>(
  data: T,
  message: string = "Success",
  statusCode: number = 200
): IApiResponse<T> => {
  return {
    success: true,
    message,
    data,
    statusCode,
  };
};

// Helper function to create error response
export const createErrorResponse = (
  message: string,
  statusCode: number = 500,
  data: null = null
): IApiResponse<null> => {
  return {
    success: false,
    message,
    data,
    statusCode,
  };
};

