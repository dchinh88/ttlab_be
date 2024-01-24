import { Prop } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
export class MongoBaseSchema {
    _id: Types.ObjectId;
    id: string;

    @Prop({ required: false, default: null, type: Date })
    createdAt: Date;

    @Prop({ required: false, default: null, type: Date })
    updatedAt: Date;

    @Prop({ required: false, default: null, type: Date })
    deletedAt?: Date;

    @Prop({
        required: false,
        default: null,
        type: SchemaTypes.ObjectId,
    })
    deletedBy?: Types.ObjectId;

    @Prop({
        required: false,
        default: null,
        type: SchemaTypes.ObjectId,
    })
    updatedBy?: Types.ObjectId;

    @Prop({ required: false, default: null, type: SchemaTypes.ObjectId })
    createdBy?: Types.ObjectId;
}
