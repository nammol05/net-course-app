/* eslint-disable prettier/prettier */
import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { CreateMusicItemDto } from '../dto/create-music-item.dto'; 

@Table({ tableName: 'music_items', timestamps: false })
export class MusicItem extends Model<MusicItem, CreateMusicItemDto> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  music_name: string;

  @Column(DataType.DECIMAL)
  price: number;

  @Column
  is_new: boolean;

  @Column
  brand: string;
}