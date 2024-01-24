import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './user.repository';
import { User, UserSchema } from '@/database/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [UserController],
    providers: [
        UserService,
        UserRepository
    ],
    exports: [UserRepository, UserService],
})
export class UserModule { }
