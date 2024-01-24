import { Injectable, Type, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pw: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user?.pass !== pw) {
            throw new UnauthorizedException();
        }
        // const { pass, ...result } = user;
        const payload = {
            sub: user._id,
            name: user.name
        }
        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

}