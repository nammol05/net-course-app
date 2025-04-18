/* eslint-disable prettier/prettier */
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'customers',
    timestamps: false,
})
export class Customer extends Model {
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    name: string;

    @Column({
        defaultValue: false,
    })
    isActive: boolean;

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
