import { Body, Controller, HttpStatus, Post, HttpCode, UseGuards, Get, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@/guard/auth.guard";
import { Roles } from "@/roles/roles.decorator";
import { Role } from "@/roles/role.enum";
import { RolesGuard } from "@/guard/roles.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.name, signInDto.pass);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user
    }
}