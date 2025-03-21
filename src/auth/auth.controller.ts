/* eslint-disable prettier/prettier */
import { Controller, Post, HttpCode, Body, UseGuards, Request, Get, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/register')
  @Render('register') // This will render views/register.hbs
  showRegisterPage() {
    return { message: '' }; // Default empty message for the template
  }

  // Handle Registration Request
  @Post('/register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto) {
    try {
      await this.authService.register(registerDto);
      return { message: 'Registration successful! You can now log in.' };
    } catch (error) {
      return { message: 'An error occurred during registration. Please try again.' };
    }
  }


  // Handle Login Request
  @Post('/login')
  @HttpCode(201)
  async login(@Body() loginDto: LoginDto) {
    const { access_token } = await this.authService.login(loginDto);
    return { message: 'Login complete', access_token };
  }

  // Get User Profile (Protected Route)
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req: any) {
    return await this.authService.getUsertProfile(Number(req.user.user_id));
  }
}
