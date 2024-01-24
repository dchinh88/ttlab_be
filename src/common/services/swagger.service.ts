import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { HttpStatus } from '../constants';
import { ErrorResponse, SuccessResponse } from '../helpers/swaggerResponse';
import { ObjectId } from 'mongodb';

export enum SwaggerApiType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    GET_LIST = 'GET_LIST',
    GET_DETAIL = 'GET_DETAIL',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    BULK_DELETE = 'BULK_DELETE',
    BULK_UPDATE = 'BULK_UPDATE',
    TEST_CONNECTION = 'TEST_CONNECTION',
    // TODO: Add api type for REFRESH_TOKEN
}

export const SWAGGER_EXAMPLE_ID = new ObjectId().toString();

export enum SwaggerExample {
    ORGANIZATION_AUTO_GENERATED_CODE = 'ORG-00001-VIP_PRO',
}

export function ApiResponseError(apiTypes: SwaggerApiType[]) {
    const decorators = [
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal system error',
            schema: {
                // response example
                example: new ErrorResponse(
                    'SYSTEM_ERROR: 1625647014802-291ee2eb-59f3-4804-ba29-87d9b2bd73e9',
                ),
            },
        }),
    ];
    if (apiTypes.includes(SwaggerApiType.LOGIN)) {
        decorators.push(
            ApiResponse({
                status: HttpStatus.BAD_REQUEST,
                description: 'Email and/or Password is invalid',
                schema: {
                    // response example
                    example: new ErrorResponse('User does not exist'),
                },
            }),
        );
    } else {
        decorators.push(
            ApiResponse({
                status: HttpStatus.UNAUTHORIZED,
                description: 'User is not authorized',
                schema: {
                    // response example
                    example: new ErrorResponse('Unauthorized'),
                },
            }),
        );
    }
    if (
        apiTypes.includes(SwaggerApiType.GET_DETAIL) ||
        apiTypes.includes(SwaggerApiType.UPDATE) ||
        apiTypes.includes(SwaggerApiType.DELETE)
    ) {
        decorators.push(
            ApiResponse({
                status: HttpStatus.ITEM_NOT_FOUND,
                description: 'The item with id = xxx does not exist',
                schema: {
                    // response example
                    example: new ErrorResponse('Item does not exist'),
                },
            }),
        );
    }
    if (
        apiTypes.includes(SwaggerApiType.CREATE) ||
        apiTypes.includes(SwaggerApiType.UPDATE) ||
        apiTypes.includes(SwaggerApiType.GET_LIST) ||
        apiTypes.includes(SwaggerApiType.BULK_DELETE) ||
        apiTypes.includes(SwaggerApiType.BULK_UPDATE)
    ) {
        decorators.push(
            ApiResponse({
                status: HttpStatus.BAD_REQUEST,
                description: 'Invalid parameter and/or body request',
                schema: {
                    // response example
                    example: new ErrorResponse('Bad Request Exception', [
                        {
                            key: 'page',
                            message: 'Page must be a numeric value',
                        },
                    ]),
                },
            }),
        );
    }
    if (apiTypes.includes(SwaggerApiType.TEST_CONNECTION)) {
        decorators.push(
            ApiResponse({
                status: HttpStatus.BAD_REQUEST,
                description: 'Invalid parameter and/or body request',
                schema: {
                    // response example
                    example: new ErrorResponse('Test connection failed'),
                },
            }),
        );
    }
    return applyDecorators(...decorators);
}

export function ApiResponseSuccess(data: unknown) {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.OK,
            description: 'Success response example',
            schema: {
                // response example
                example: new SuccessResponse(data),
            },
        }),
    );
}
