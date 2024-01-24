import dotenv from 'dotenv';
import { IErrorResponse } from './response';
dotenv.config();

const DEFAULT_SUCCESS_MESSAGE = 'success';

export class SuccessResponse {
    constructor(data = {}) {
        return {
            message: DEFAULT_SUCCESS_MESSAGE,
            data,
        };
    }
}
export class ErrorResponse {
    constructor(message = '', errors: IErrorResponse[] = []) {
        return {
            message,
            errors,
        };
    }
}
