import { I18nKey } from '@/i18n/i18n';
import {
    HttpException,
    Inject,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n';
import { DEFAULT_LANGUAGE } from '../constants';

export class BaseController {
    @Inject()
    i18n: I18nService;

    logger = new Logger(this.constructor.name, { timestamp: true });

    translate(key: I18nKey, options?: TranslateOptions): string {
        // In testing environment, I18nContext is not available
        return this.i18n.translate(key as string, {
            ...options,
            lang: I18nContext?.current?.()?.lang ?? DEFAULT_LANGUAGE,
        });
    }

    handleError(err: any): void {
        if (err && err instanceof HttpException) {
            throw err;
        }
        throw new InternalServerErrorException(err);
    }
}
