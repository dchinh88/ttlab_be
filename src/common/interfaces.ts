import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    DEFAULT_LIMIT_FOR_DROPDOWN,
    INPUT_TEXT_MAX_LENGTH,
    MAX_INTEGER,
    MAX_PAGE_LIMIT,
    MAX_PAGE,
    MIN_PAGE_LIMIT,
    MIN_PAGE,
    OrderBy,
    OrderDirection,
} from './constants';
import { JoiValidate } from './decorators/validator.decorator';
import Joi from '@/plugins/joi';
import { Types } from 'mongoose';

export class CommonListQuery {
    @ApiPropertyOptional({
        type: Number,
        description: 'Specify the page of results to return',
        default: 1,
        minimum: 1,
        maximum: MAX_INTEGER,
    })
    @JoiValidate(
        Joi.number().min(MIN_PAGE).max(MAX_PAGE).optional().allow(null),
    )
    page?: number;

    @ApiPropertyOptional({
        type: Number,
        description: 'The number of items returned in the response',
        default: 10,
        minimum: 1,
        maximum: MAX_INTEGER,
    })
    @JoiValidate(
        Joi.number()
            .min(MIN_PAGE_LIMIT)
            .max(MAX_PAGE_LIMIT)
            .optional()
            .allow(null),
    )
    limit?: number;

    @ApiPropertyOptional({
        enum: OrderBy,
        description: 'Which field used to sort',
        default: OrderBy.CREATED_AT,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(OrderBy))
            .optional(),
    )
    orderBy?: string;

    @ApiPropertyOptional({
        enum: OrderDirection,
        description: 'ASC or DESC',
        default: OrderDirection.DESC,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(OrderDirection))
            .optional(),
    )
    orderDirection?: OrderDirection;

    @ApiPropertyOptional({
        type: String,
        description: 'keyword',
    })
    @JoiValidate(
        Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null, ''),
    )
    keyword?: string;
}

export class CommonListDropdownQuery {
    @ApiPropertyOptional({
        type: Number,
        description: 'Specify the page of results to return',
        default: 1,
        minimum: 1,
        maximum: MAX_INTEGER,
    })
    @JoiValidate(
        Joi.number().min(MIN_PAGE).max(MAX_PAGE).optional().allow(null),
    )
    page?: number;

    @ApiPropertyOptional({
        type: Number,
        description: 'The number of items returned in the response',
        default: DEFAULT_LIMIT_FOR_DROPDOWN,
        minimum: 1,
        maximum: MAX_INTEGER,
    })
    @JoiValidate(
        Joi.number()
            .min(MIN_PAGE_LIMIT)
            .max(MAX_PAGE_LIMIT)
            .optional()
            .allow(null),
    )
    limit?: number;

    @ApiPropertyOptional({
        enum: OrderBy,
        description: 'Which field used to sort',
        default: OrderBy.CREATED_AT,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(OrderBy))
            .optional(),
    )
    orderBy?: string;

    @ApiPropertyOptional({
        enum: OrderDirection,
        description: 'ASC or DESC',
        default: OrderDirection.DESC,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(OrderDirection))
            .optional(),
    )
    orderDirection?: OrderDirection;

    @ApiPropertyOptional({
        type: String,
        description: 'keyword',
    })
    @JoiValidate(
        Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null, ''),
    )
    keyword?: string;
}

export interface IUserTokenPayload {
    id: string;
    email: string;
    name: string;
    expiresIn: number;
    hashToken?: string;
    isMultiFactorAuthenticated?: boolean;
}

export interface IUserToken extends IUserTokenPayload {
    iat: number;
    exp: number;
}

export interface ILoggedInApiAccessToken {
    _id: Types.ObjectId;
    isPlatformAdmin: boolean;
    organizationIds: string[];
}
