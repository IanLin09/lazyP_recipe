
// type ErrorMap = Record<string, Record<number, Record<string, string>> | string>;
import swAlert from '@/components/alert';

export class useQueryResponseError extends Error {
    status: number;
    
    constructor(message: string, status: number) {
      super(message);
      this.status = status;
    }
  }

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

export const errorAlert = async (e:Error) => {
    if (e instanceof useQueryResponseError) {
        switch (e.status){
            case 401:{
                await swAlert.confirm({ title:"Error",content: "Please login agian.","icon":"error" });
                window.location.replace("/home")
            }
            default:{
                await swAlert.confirm({ title:"Error",content: "Unknown error occured","icon":"error" });
            }
        }
    } else {
    // Handle other error types
    await swAlert.confirm({ title:"Error",content: "Unknown error occured","icon":"error" });
    }
}
  
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