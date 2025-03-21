/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthUser } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'default-secret-key', 
      signOptions: { expiresIn: '1d' }, 
    }),
    SequelizeModule.forFeature([AuthUser]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
