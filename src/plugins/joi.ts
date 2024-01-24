type JoiRoot = typeof import('joi');
import JoiBase, { ExtensionFactory } from 'joi';
import { ObjectId } from 'mongodb';

const joiObjectIdExtension: ExtensionFactory = (joi: JoiRoot) => {
    return {
        type: 'isObjectId',
        base: joi.string(),
        validate(value: any, helpers: JoiBase.CustomHelpers) {
            if (value && !ObjectId.isValid(value)) {
                return { value, errors: helpers.error('string.objectId') };
            }
            return { value };
        },
    };
};

const Joi = JoiBase.extend(joiObjectIdExtension) as typeof JoiBase & {
    isObjectId(): JoiBase.StringSchema;
};

export default Joi;
