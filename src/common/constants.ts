import Joi from '../plugins/joi';

export enum Languages {
    EN = 'en',
    JA = 'ja',
}

export enum OrderDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export enum OrderBy {
    ID = '_id',
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
}

export const DEFAULT_PORT = 3000;
export const LANGUAGE_HEADER = 'accept-language';
export const DEFAULT_LANGUAGE = Languages.EN;
export const TIMEZONE_HEADER = 'x-timezone';
export const TIMEZONE_NAME_HEADER = 'x-timezone-name';
export const TIMEZONE_DEFAULT = '+09:00';
export const TIMEZONE_NAME_DEFAULT = 'Asia/Tokyo';

export const DEFAULT_LIMIT_FOR_DROPDOWN = 1000;
export const DEFAULT_LIMIT_FOR_PAGINATION = 10;
export const DEFAULT_FIRST_PAGE = 1;
export const DEFAULT_ORDER_BY = 'createdAt';
export const DEFAULT_ORDER_DIRECTION = 'desc';
export const DEFAULT_MIN_DATE = '1970-01-01 00:00:00';
export const DEFAULT_MAX_DATE = '3000-01-01 00:00:00';

export const MIN_ID = 1;
export const MIN_PAGE_LIMIT = 1; // min item per one page
export const MIN_PAGE = 1; // min page value
export const MAX_PAGE_LIMIT = 10000; // max item per one page
export const MAX_PAGE = 10000; // max page value

export const INPUT_TEXT_MAX_LENGTH = 255;
export const FIREBASE_TOKEN_MAX_LENGTH = 2000;
export const URL_MAX_LENGTH = 2048;
export const TEXTAREA_MAX_LENGTH = 2000;
export const ARRAY_MAX_LENGTH = 500;
export const INPUT_PHONE_MAX_LENGTH = 15;
export const MAX_INTEGER = 2147483647;
export const PASSWORD_MIN_LENGTH = 6;
export const MIN_PRICE = 0;
export const MAX_PRICE = Number.MAX_SAFE_INTEGER;

export const Regex = {
    URI: /^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
    EMAIL: /^(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
    NUMBER: /^(?:[0-9]\d*|)$/,
    CODE: /^[a-zA-Z\-_0-9]+$/,
    PHONE: /^\d{1,14}$/,
    DEVICE_NAME: /^[A-Za-z0-9+=.,@-_]*$/,
    RECOVERY_CODE: /^[A-Z0-9-\s]*$/,
};

export const softDeleteCondition = {
    $or: [
        {
            deletedAt: {
                $exists: true,
                $eq: null,
            },
        },
        {
            deletedAt: {
                $exists: false,
            },
        },
    ],
};

export const DEFAULT_ID_FIELD = {
    id: '$_id',
};

export enum DateFormat {
    YYYY_MM_DD_HYPHEN = 'YYYY-MM-DD',
    HH_mm_ss_COLON = 'HH:mm:ss',
    YYYY_MM_DD_HYPHEN_HH_mm_ss_COLON = 'YYYY-MM-DD HH:mm:ss',
    YYYY_MMM_DD_HYPHEN_HH_mm_ss_COLON = 'YYYY-MMM-DD HH:mm:ss',
    YYYY_MM_DD_HYPHEN_HH_mm_ss_Z_COLON = 'YYYY-MM-DD HH:mm:ssZ',
    DD_MM_YYYY_SLASH_HH_mm_ss_COLON = 'YYYY/MM/DD HH:mm:ss',
    YY_MM_DD_HH_mm = 'YYMMDDHHmm',
    HH_mm_COLON_DD_MM_YYYY_SLASH = 'HH:mm DD/MM/YYYY',
    ISO = 'YYYY-MM-DDTHH:mm:ss.sssZ',
    YYYY_MM_HYPHEN = 'YYYY-MM',
    DD_MM_YYYY = 'DDMMYYYY',
}

export const CommonListQuerySchema = {
    page: Joi.number().min(MIN_PAGE).max(MAX_PAGE).optional().allow(null),
    limit: Joi.number()
        .min(MIN_PAGE_LIMIT)
        .max(MAX_PAGE_LIMIT)
        .optional()
        .allow(null),
    keyword: Joi.string().max(INPUT_TEXT_MAX_LENGTH).optional().allow(null, ''),
    orderDirection: Joi.string()
        .valid(...Object.values(OrderDirection))
        .optional(),
    orderBy: Joi.string()
        .valid(...Object.values(OrderBy))
        .optional(),
};

export enum HttpStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    UNPROCESSABLE_ENTITY = 422,
    ITEM_NOT_FOUND = 444,
    ITEM_ALREADY_EXIST = 445,
    ITEM_INVALID = 446,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
}

export const mongoIdSchema = Joi.isObjectId().label('id');

export enum BooleanString {
    TRUE = 'true',
    FALSE = 'false',
}

export enum MetadataKey {
    JOI = 'JOI',
}

export enum NodeEnv {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    STAGING = 'staging',
    TEST = 'test',
}
