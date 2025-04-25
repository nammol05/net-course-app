/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateMusicItemDto } from './create-music-item.dto';

export class UpdateMusicDto extends PartialType(CreateMusicItemDto) {}