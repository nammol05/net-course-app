/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MusicItem } from './entities/music.entity';  
import { CreateMusicItemDto } from './dto/create-music-item.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(MusicItem)
    private readonly musicModel: typeof MusicItem,
  ) {}

  findAll(): Promise<MusicItem[]> {
    return this.musicModel.findAll();
  }

  findOne(id: number): Promise<MusicItem> {
    return this.musicModel.findByPk(id) as Promise<MusicItem>;
  }

  create(data: CreateMusicItemDto): Promise<MusicItem> {
    return this.musicModel.create(data);  
  }

  async findByName(music_name: string): Promise<MusicItem | null> {
    return this.musicModel.findOne({
      where: { music_name },
    });
  }

  async update(id: number, updateMusicItemDto: CreateMusicItemDto): Promise<[number, MusicItem[]]> {
    return this.musicModel.update(updateMusicItemDto, {
      where: { id },
      returning: true,  
    });
  }

  async remove(id: number): Promise<number> {
    const deletedCount = await this.musicModel.destroy({
      where: { id },
    });
    return deletedCount;  
  }
}