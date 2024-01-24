import { Prop, Schema } from "@nestjs/mongoose";
import { MongoBaseSchema } from "./base.schema";
import { MongoCollection } from "../utils/constants";
import { createSchemaForClass } from "../utils/helper";
export type ProductDocument = SchemaDocument<Product>;
@Schema({
    timestamps: true,
    collection: MongoCollection.PRODUCTS,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true
    }
})
export class Product extends MongoBaseSchema {
    @Prop({ require: true, type: String })
    name: string;
    @Prop({ required: true, type: Number })
    price: number;
    @Prop({ required: true, type: Number })
    quantity: number;
    @Prop({ required: false, type: String })
    description: string;
    @Prop({ required: true, type: String })
    image: string;
}

const ProductSchema = createSchemaForClass(Product);

export { ProductSchema };