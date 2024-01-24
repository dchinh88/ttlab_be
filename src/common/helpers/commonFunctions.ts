import bcrypt from 'bcrypt';
import { DateFormat, MetadataKey } from '../constants';
import dotenv from 'dotenv';
import dayjs from '../../plugins/dayjs';
import { camelCase, mapKeys } from 'lodash';
import winston from 'winston';
import Joi, { AnySchema, ObjectSchema } from 'joi';
import { Types } from 'mongoose';

dotenv.config();

const DEFAULT_TIMEZONE_NAME = process.env.TIMEZONE_DEFAULT_NAME;

export function extractToken(authorization = '') {
    if (/^Bearer /.test(authorization)) {
        return authorization.substring(7, authorization.length);
    }
    return '';
}

export function hashPassword(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function convertTimeToUTC(time: string | Date) {
    return dayjs.tz(time, 'UTC').toDate();
}

export function isEndOfDay(
    dateTime: string | Date,
    tzName = DEFAULT_TIMEZONE_NAME,
) {
    const time = dayjs
        .tz(convertTimeToUTC(dateTime), tzName)
        .format(DateFormat.HH_mm_ss_COLON);
    return /23:59:59/.test(time);
}

export function isStartOfDay(
    dateTime: string | Date,
    tzName = DEFAULT_TIMEZONE_NAME,
) {
    const time = dayjs
        .tz(convertTimeToUTC(dateTime), tzName)
        .format(DateFormat.HH_mm_ss_COLON);
    return /00:00:00/.test(time);
}

/**
 * usecase: convert value of $select operator to value of $project operator in mongodb
 * example: ['_id', 'name'] => {
 *      _id: 1,
 *      name: 1,
 * }
 * @param attributeList attributes list select from mongo collection
 * @returns attributes list in $project operation
 */
export const parseMongoProjection = (
    attributeList: string[],
    opts?: { prefix?: string; exclude?: boolean },
): Record<string, number> => {
    const { prefix, exclude } = opts ?? {};
    let rs = {};
    attributeList.forEach((val) => {
        const path = prefix?.length ? `${prefix}.${val}` : val;
        rs = {
            ...rs,
            [path]: exclude ? 0 : 1,
        };
    });

    return rs;
};

export const toObjectId = <T extends SchemaId | SchemaId[]>(
    id: T,
): T extends SchemaId
    ? Types.ObjectId
    : T extends SchemaId[]
      ? Types.ObjectId[]
      : undefined => {
    try {
        if (!id) {
            return undefined;
        }
        if (Array.isArray(id)) {
            return id.map((item) => new Types.ObjectId(item.toString())) as any;
        }
        return new Types.ObjectId(id.toString()) as any;
    } catch (error) {
        return undefined;
    }
};

export function parseToCamelCase(data) {
    data = mapKeys(data, (value, key) => camelCase(key));
    return data;
}

export const customFormat = winston.format.printf((error) => {
    const message = error[Symbol.for('message')] as string;
    if (message) {
        return `${JSON.stringify(message)}`
            .replace(/\\n/g, '')
            .replace(/\s{2,}/g, '');
    }
    return `${JSON.stringify(message)}`;
});

export const generateRandomString = (length: number) => {
    let result = '';
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
    }
    return result;
};

export const convertClassToJoiRawObject = <T>(classType: ClassType<T>) => {
    try {
        const constructor = classType.prototype.constructor as any;
        const parentClassName = Object.getPrototypeOf(constructor)
            ?.name as string;
        let joiObjectFromMetadata =
            Reflect.getMetadata(
                `${MetadataKey.JOI}_${constructor.name}`,
                constructor,
            ) ?? {};
        if (parentClassName?.length) {
            const parentJoiObjectFromMetadata = Reflect.getMetadata(
                `${MetadataKey.JOI}_${parentClassName}`,
                constructor,
            );
            if (parentJoiObjectFromMetadata) {
                joiObjectFromMetadata = {
                    ...parentJoiObjectFromMetadata,
                    ...joiObjectFromMetadata,
                };
            }
        }

        return joiObjectFromMetadata as Record<string, AnySchema<any>>;
    } catch (error) {
        return undefined;
    }
};

export const convertClassToJoiObjectSchema = <T>(
    classType: ClassType<T>,
): ObjectSchema<any> | undefined => {
    try {
        const joiObjectFromMetadata = convertClassToJoiRawObject(classType);
        if (joiObjectFromMetadata) {
            return Joi.object(joiObjectFromMetadata);
        }
        return undefined;
    } catch (error) {
        return undefined;
    }
};
