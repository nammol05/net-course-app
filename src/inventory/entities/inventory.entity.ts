/* eslint-disable prettier/prettier */
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'admin_inventory' }) 
export class AdminInventory extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  itemname: string;

  @Column({ allowNull: false, type: DataType.FLOAT })
  cost: number;

  @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
  quantity: number;

  @Column({ allowNull: false, type: DataType.TEXT })
  descrip: string; 

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  thumbnail: string;
}

