
// type ErrorMap = Record<string, Record<number, Record<string, string>> | string>;
type ErrorNestedValue = {
    [key: number]: {
        [key: string]: string | undefined
    } | undefined
}

type ErrorMapValue = ErrorNestedValue | string;

type ErrorMap= {
    [key: string]: ErrorMapValue | undefined;
}

export type ErrorResponse = {
    status: number;
    message: string;
    errors: { field: string; message: string }[];
  };
  
export const parseErrors = (errorResponse: ErrorResponse): ErrorMap => {
    const errorMap: ErrorMap = {};

    if (errorResponse?.errors) {
        
        errorResponse.errors.forEach((err) => {
            const field = err.field.split('.')

            if (field.length > 1){
                const index: number = Number(field[1])
                errorMap[field[0]] = {} as ErrorNestedValue;
                const nestedError = errorMap[field[0]] as ErrorNestedValue;
                
                if (!nestedError[index]) {
                    nestedError[index] = {};
                }

                if (nestedError[index]) {
                    nestedError[index][field[2]] = err.message;
                }
            }else{
                errorMap[err.field] = err.message;
            }            
        });
    }
    return errorMap;
};