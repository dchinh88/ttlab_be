import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { I18nService } from '@/i18n/i18n.service';
import { User, UserSchema } from '@/database/schemas/user.schema';
import { UserRepository } from '../user/user.repository';

@Global()
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [],
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(),
        },
        UserRepository,
        I18nService,
    ],
    exports: [UserRepository, I18nService],
})
export class CommonModule {}
