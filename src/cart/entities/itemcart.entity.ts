/* eslint-disable prettier/prettier */
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'items_cart' })
export class Cart extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  itemname: string;

  @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
  quantity: number;

  @Column({ allowNull: false, type: DataType.FLOAT })
  cost: number;

  @Column({ allowNull: true, type: DataType.TEXT })
  descrip: string;
}
