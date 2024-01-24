import { INPUT_TEXT_MAX_LENGTH } from '@/common/constants';
import { JoiValidate } from '@/common/decorators/validator.decorator';
import { UserOrderBy } from './user.constant';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import Joi from '@/plugins/joi';
import { CommonListQuery } from '@/common/interfaces';

export class CreateUserDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'User name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    pass: string;
}

export class UpdateUserDto {
    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: 'User name',
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).required())
    name: string;
    pass: string;
}

export class GetUserListQuery extends CommonListQuery {
    @ApiPropertyOptional({
        enum: UserOrderBy,
        description: 'Which field used to sort',
        default: UserOrderBy.UPDATED_AT,
    })
    @JoiValidate(
        Joi.string()
            .valid(...Object.values(UserOrderBy))
            .optional(),
    )
    orderBy?: UserOrderBy;

    @ApiProperty({
        type: String,
        maxLength: INPUT_TEXT_MAX_LENGTH,
        default: "User'name for filter",
    })
    @JoiValidate(Joi.string().trim().max(INPUT_TEXT_MAX_LENGTH).optional())
    name?: string;
    pass: string;
}
