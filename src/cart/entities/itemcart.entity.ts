/* eslint-disable prettier/prettier */
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'items_cart' }) 
export class cart extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column({ allowNull: false })
    itemname: string;

    @Column({ allowNull: false, type: DataType.INTEGER, defaultValue: 0 })
    quantity: number;
}