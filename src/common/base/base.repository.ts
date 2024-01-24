import { softDeleteCondition } from '@/common/constants';
import { I18nKey } from '@/i18n/i18n';
import { Inject, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose, {
    FilterQuery,
    Model,
    HydratedDocument,
    CreateOptions,
    UpdateQuery,
    UpdateWithAggregationPipeline,
    Types,
} from 'mongoose';
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n';
import { DEFAULT_LANGUAGE } from '../constants';
import { parseMongoProjection } from '../helpers/commonFunctions';
import { User } from '@/database/schemas/user.schema';


export class BaseRepository<T extends MongoBaseSchema> {
    @InjectConnection()
    readonly connection: mongoose.Connection;

    constructor(readonly model: Model<SchemaDocument<T>>) { }

    @Inject()
    i18n!: I18nService;

    logger = new Logger(this.constructor.name, { timestamp: true });

    async createOne(
        data: SchemaCreateDocument<T>,
        options?: CreateOptions & { aggregateErrors?: true },
    ): Promise<HydratedDocument<SchemaDocument<T>>> {
        try {
            if (options) {
                return (await this.model.create([data], options))?.[0];
            } else {
                return this.model.create(data);
            }
        } catch (error) {
            this.logger.error(`Error in BaseRepository createOne: ${error}`);
            throw error;
        }
    }

    async softDeleteOne(filter: FilterQuery<SchemaDocument<T>>) {
        try {
            return this.model.updateOne(filter, {
                deletedAt: new Date(),
            });
        } catch (error) {
            this.logger.error(`Error in BaseRepository softDelete: ${error}`);
            throw error;
        }
    }

    async getOneById(id: SchemaId, attributes: SchemaAttribute<T>[]) {
        try {
            return this.model.findOne(
                { _id: new Types.ObjectId(id), ...softDeleteCondition },
                parseMongoProjection(attributes as string[]),
            );
        } catch (error) {
            this.logger.error(`Error in BaseRepository getOneById: ${error}`);
            throw error;
        }
    }

    async findOne(name: string): Promise<User | undefined> {
        try {
            return await this.model.findOne({ name })
        } catch (error) {
            this.logger.error('Error')
            throw error
        }
    }

    async updateOneById(
        id: SchemaId,
        update: UpdateQuery<SchemaDocument<T>> | UpdateWithAggregationPipeline,
    ) {
        try {
            return this.model.updateOne(
                { _id: new Types.ObjectId(id) },
                update,
            );
        } catch (error) {
            this.logger.error(
                `Error in BaseRepository updateOneById: ${error}`,
            );
            throw error;
        }
    }

    translate(key: I18nKey, options?: TranslateOptions): string {
        // In testing environment, I18nContext is not available
        return this.i18n.translate(key as string, {
            ...options,
            lang: I18nContext?.current?.()?.lang ?? DEFAULT_LANGUAGE,
        });
    }


}
