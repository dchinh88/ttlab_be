import { Injectable } from '@nestjs/common';
import { HttpStatus } from '../constants';
import dotenv from 'dotenv';
dotenv.config();

const { VERSION: version = '1.0.0' } = process.env;

const DEFAULT_SUCCESS_MESSAGE = 'success';

export interface IErrorResponse {
    key: string;
    order?: number;
    message: string;
    value?: any;
}

export class SuccessResponse {
    constructor(data = {}) {
        return {
            code: HttpStatus.OK,
            message: DEFAULT_SUCCESS_MESSAGE,
            data,
            version,
        };
    }
}
export class ErrorResponse {
    constructor(
        code = HttpStatus.INTERNAL_SERVER_ERROR,
        message = '',
        errors: IErrorResponse[] = [],
    ) {
        return {
            code,
            message,
            errors,
            version,
        };
    }
}
export class HttpResponse<T = string> {
    constructor(code: T, message = DEFAULT_SUCCESS_MESSAGE, data?: any) {
        return {
            code,
            message,
            data,
        };
    }
}

@Injectable()
export class ApiResponse<T> {
    public code: number;

    public message: string;

    public data: T;

    public errors: IErrorResponse[];
}
