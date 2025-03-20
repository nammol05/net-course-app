/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminUser } from './entities/admin-user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ signOptions: { expiresIn: '1d' } }),
    SequelizeModule.forFeature([AdminUser]), // Register AdminUser Model
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}