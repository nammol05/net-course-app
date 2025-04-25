/* eslint-disable prettier/prettier */
import {Controller,Get,Post,Body,Param,Delete,Patch,NotFoundException,} from '@nestjs/common';
  import { MusicService } from './music.service';
  import { CreateMusicItemDto } from './dto/create-music-item.dto';
  import { MusicItem } from './entities/music.entity';
  
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post('/create')
  async create(@Body() createMusicItemDto: CreateMusicItemDto) {
    const newMusic = await this.musicService.create(createMusicItemDto);
    if (!newMusic) {
      throw new Error('Cannot create music item!');
    }
    return {
      message: 'Music item created successfully.',
      data: newMusic,
    };
  }

  @Get()
  findAll() {
    return this.musicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const music = await this.musicService.findOne(+id);
    if (!music) {
      throw new NotFoundException('Music item not found!');
    }
    return music;
  }

  @Get('/findname/:music_name')
async findByName(@Param('music_name') music_name: string): Promise<MusicItem> {
  const music = await this.musicService.findByName(music_name);
  if (!music) {
    throw new NotFoundException('Music item not found!');
  }
  return music;
}

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.musicService.remove(+id);
    if (deleted === 0) {
      throw new NotFoundException('Music item not found to remove!');
    }
    return { message: 'Music item removed successfully.' };
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateMusicItemDto: CreateMusicItemDto,
  ) {
    const [updated] = await this.musicService.update(+id, updateMusicItemDto);
    if (updated === 0) {
      throw new NotFoundException('Music item not found to update!');
    }
    return { message: 'Music item updated successfully.' };
  }
}