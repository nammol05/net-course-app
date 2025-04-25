/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthUser } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(AuthUser)
    private readonly authUserModel: typeof AuthUser,
    private jwtService: JwtService,
  ) {}

  // Registration logic
  async register(registerDto: RegisterDto) {
    // Check if the email is already in use
    const existingUser = await this.authUserModel.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('This email already exists. Please try again.');
    }

    // Hash the password before storing it
    const salt = await genSalt(10);
    const hashedPassword = await hash(registerDto.password, salt);

    // Create the new user
    const newUser = await this.authUserModel.create({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
    });

    // Return the new user information (excluding password)
    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  // Login logic
  async login(loginDto: LoginDto) {
    // Fetch user by email
    const authuser = await this.authUserModel.findOne({
      where: { email: loginDto.email },
    });

    if (!authuser) {
      throw new UnauthorizedException('This email does not exist. Please try again.');
    }

    // Compare provided password with stored hash
    const isValid = await compare(loginDto.password, authuser.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password.');
    }

    // Create JWT payload and sign token
    const payload = { user_id: authuser.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '1d',
    });

    return { access_token: token };
  }

  // Fetch user profile by ID
  async getUserProfile(id: number) {
    return await this.authUserModel.findByPk(id, {
      attributes: ['id', 'username', 'email'],
    });
  }
}