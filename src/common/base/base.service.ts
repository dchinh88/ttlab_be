import { I18nKey } from '@/i18n/i18n';
import { Inject, Logger } from '@nestjs/common';
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n';
import { DEFAULT_LANGUAGE } from '../constants';
import { toObjectId } from '../helpers/commonFunctions';
import { BaseRepository } from './base.repository';

export class BaseService<
    T extends MongoBaseSchema = any,
    R extends BaseRepository<T> = undefined,
> {
    @Inject()
    i18n!: I18nService;
    model: any;

    constructor(repo?: R) {
        this.repository = repo;
    }

    repository: R;

    logger = new Logger(this.constructor.name, { timestamp: true });

    translate(key: I18nKey, options?: TranslateOptions): string {
        // In testing environment, I18nContext is not available
        return this.i18n.translate(key as string, {
            lang: I18nContext?.current?.()?.lang ?? DEFAULT_LANGUAGE,
            ...options,
        });
    }

    async softDeleteById(id: SchemaId) {
        try {
            return this.repository.softDeleteOne({ _id: toObjectId(id) });
        } catch (error) {
            this.logger.error(`Error in BaseService softDeleteById: ${error}`);
            throw error;
        }
    }
}
