/* eslint-disable prettier/prettier */
import { Controller, Body, HttpCode, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/regist')
    @HttpCode(201)
    async register(@Body() registerDto: RegisterDto) {
        await this.authService.register(registerDto);
        return {
            messsage: 'Register Complete',
        };
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        const result = await this.authService.login(loginDto);
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    async getProfile(@Request() req: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return await this.authService.getUserProfile(Number(req.user.user_id))
    }
}
