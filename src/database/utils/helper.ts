import { SchemaFactory } from '@nestjs/mongoose';
import { MongoBaseSchema } from '../schemas/base.schema';

export const createSchemaForClass = <T extends MongoBaseSchema>(
    classType: ClassType<T>,
) => {
    const schema = SchemaFactory.createForClass(classType);

    return schema;
};
