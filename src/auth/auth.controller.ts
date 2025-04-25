/* eslint-disable prettier/prettier */
import { Controller, Post, HttpCode, Body, UseGuards, Request, Get, Render, UnauthorizedException, BadRequestException } from '@nestjs/common';
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
      const newUser = await this.authService.register(registerDto);
      return {
        message: 'Registration successful! You can now log in.',
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      };
    } catch (error) {
      // Explicitly handle the error for the registration process
      if (error.response && error.response.message) {
        throw new BadRequestException(error.response.message);
      }
      throw new BadRequestException('An error occurred during registration. Please try again.');
    }
  }

  // Login Request
  @Post('/login')
  @HttpCode(200) // Use 200 instead of 201 for login success
  async login(@Body() loginDto: LoginDto) {
    try {
      const token = await this.authService.login(loginDto);
      if (!token || !token.access_token) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return {
        message: 'Login successful',
        access_token: token.access_token, // Ensure token is returned properly
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  // Get User Profile (Protected Route)
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() req: any) {
    try {
      const profile = await this.authService.getUserProfile(Number(req.user.user_id));
      if (!profile) {
        throw new UnauthorizedException('User not found');
      }
      return profile;
    } catch (error) {
      throw new UnauthorizedException('Failed to fetch user profile');
    }
  }
}