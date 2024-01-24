import { HttpException, HttpExceptionOptions } from '@nestjs/common';
import { HttpStatus } from '../constants';

export class CustomException extends HttpException {
    constructor(
        status: HttpStatus,
        message: string,
        options?: HttpExceptionOptions,
    ) {
        super(message, status, options);
    }
}
