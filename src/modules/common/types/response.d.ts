type ErrorCode = import('@/common/constants').ErrorCode;
type I18nKey = import('@/i18n/i18n').I18nKey;
type IErrorResponse = {
    key: string;
    message: string;
    errorCode: ErrorCode;
    order?: number;
    value?: any;
};

type JoiValidationCustomError = {
    errorCode: ErrorCode;
    messageI18nKey?: I18nKey;
};

type IGetListResponse<T = any> = {
    items: T[];
    totalItems: number;
};
