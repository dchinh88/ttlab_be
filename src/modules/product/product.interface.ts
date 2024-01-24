import { INPUT_TEXT_MAX_LENGTH } from "@/common/constants";
import { JoiValidate } from "@/common/decorators/validator.decorator";
import { CommonListQuery } from "@/common/interfaces";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import Joi from "joi";
import { ProductOrderBy } from "./product.constant";

export class CreateProductDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'Product name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().required())
    price: number;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().required())
    quantity: number;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'description',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    description: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'image',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    image?: string;
}

export class UpdateProductDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'Product name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().required())
    price: number;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().required())
    quantity: number;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'description',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    description: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'image',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    image: string;
}

export class GetProductListQuery extends CommonListQuery {
    @ApiPropertyOptional({
        enum: ProductOrderBy,
        description: 'Which field used to sort',
        default: ProductOrderBy.UPDATED_AT,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(ProductOrderBy))
            .optional(),
    )
    orderBy?: ProductOrderBy;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'Product name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    name?: string;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().optional())
    price?: number;

    @ApiProperty({
        type: Number,
    })
    @JoiValidate(Joi.number().optional())
    quantity?: number;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'description',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    description?: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'image',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    image?: string;
}