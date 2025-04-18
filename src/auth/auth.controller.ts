/* eslint-disable prettier/prettier */
import { Controller, Post, HttpCode, Body, UseGuards, Request, Get, Render, UnauthorizedException } from '@nestjs/common';
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


  @Post('/login')
  @HttpCode(200) // Use 200 instead of 201 for login success
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.login(loginDto);
    
    if (!token || !token.access_token) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    return {
      message: 'Login successful',
      access_token: token.access_token, // Ensure token is returned properly
    };
  }

  // Get User Profile (Protected Route)
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req: any) {
    return await this.authService.getUsertProfile(Number(req.user.user_id));
  }
}
