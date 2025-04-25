/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MusicItem } from './entities/music.entity'; 
import { MusicService } from './music.service';
import { MusicController } from './music.controller';

@Module({
  imports: [SequelizeModule.forFeature([MusicItem])], 
  providers: [MusicService],
  controllers: [MusicController],
})
export class MusicModule {}
