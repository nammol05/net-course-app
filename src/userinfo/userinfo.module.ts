/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { UserinfoController } from './userinfo.controller';
import { Userinfo } from './entities/userinfo.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Userinfo])],
  controllers: [UserinfoController],
  providers: [UserinfoService],
})
export class UserinfoModule {}
