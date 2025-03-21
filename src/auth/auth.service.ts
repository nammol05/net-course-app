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
    private jwtService : JwtService,
) {}

  async register(registerDto: RegisterDto) {
    const authuser = await this.authUserModel.findOne({
      where: {email: registerDto.email },
    });
    if(authuser) {
      throw new BadRequestException(
        'this email already exists. Please try again. ',
      );
    }   
    const salt = await genSalt(10);
    const hashPassword = await hash(registerDto.password, salt);

    const newUser = await this.authUserModel.create({
      username : registerDto.username,
      email : registerDto.email,
      password : hashPassword,
    });
    return newUser;
  } 

  async login(loginDto: LoginDto) {
    const authuser = await this.authUserModel.findOne({
      where: { email: loginDto.email },
    });
  
    console.log("Fetched user:", authuser);
  
    if (!authuser) {
      throw new UnauthorizedException('This email does not exist. Please try again.');
    }
  
    const isValid = await compare(loginDto.password, authuser.password);
    
    console.log("Password comparison result:", isValid);
  
    if (!isValid) {
      throw new UnauthorizedException('Invalid password.');
    }
  
    const payload = { user_id: authuser.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '1d',
    });
  
    return { access_token: token };
  }
  
  async getUsertProfile(id: number){
    return await this.authUserModel.findByPk(id, {
      attributes: ['id', 'username', 'email'],
    });
  }
}
