/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdminUser } from './entities/admin-user.entity';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(AdminUser)
    private readonly adminUserModel: typeof AdminUser,
    private jwtService: JwtService,
  ) {}

  async loginAdmin(email: string, password: string) {
    const admin = await this.adminUserModel.findOne({ where: { email } });

    if (!admin) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isValid = await compare(password, admin.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = { admin_id: admin.id };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: '1d',
    });

    return { access_token: token };
  }
}