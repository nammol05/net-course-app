/* eslint-disable prettier/prettier */
import { IntegerDataType } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName : 'userInfo',
    timestamps : false,
})
export class Userinfo extends Model {
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    firstname: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    lastname: string;

    @Column({
        type: DataType.INTEGER,
    })
    age: IntegerDataType;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    hobby: string;
}
