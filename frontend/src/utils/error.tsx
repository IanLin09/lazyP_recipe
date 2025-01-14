type ErrorMap = Record<string, string>; 

export type ErrorResponse = {
    status: number;
    message: string;
    errors: { field: string; message: string }[];
  };
  
export const parseErrors = (errorResponse: ErrorResponse): ErrorMap => {
    const errorMap: ErrorMap = {};
    if (errorResponse?.errors) {
        errorResponse.errors.forEach((err) => {
            errorMap[err.field] = err.message;
        });
    }
    return errorMap;
};