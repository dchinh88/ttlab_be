import { Product } from "@/database/schemas/product.schema";

export enum ProductOrderBy {
    ID = 'id',
    CREATED_AT = 'create_at',
    UPDATED_AT = 'updateAt',
}

export const ProductAttributesForList: (keyof Product)[] = [
    '_id',
    'id',
    'name',
    'price',
    'quantity',
    'description',
    'image',
    'createdAt',
    'updatedAt',

];

export const ProductAttributesForDetail: (keyof Product)[] = ['_id', 'id', 'name',
    'price',
    'quantity',
    'description',
    'image',]