/* eslint-disable prettier/prettier */
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'customers',
  timestamps: false, // Assuming no timestamps for createdAt/updatedAt
})
export class Customer extends Model {
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  fullname: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  position: string;
  
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  phone: string;
}