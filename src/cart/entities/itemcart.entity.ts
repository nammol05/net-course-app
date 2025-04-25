/* eslint-disable prettier/prettier */
import { Model, Table, PrimaryKey, AutoIncrement, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { AuthUser } from '../../auth/entities/auth.entity'; // Adjust the import path as needed
import { AdminInventory } from '../../inventory/entities/inventory.entity'; // Adjust the import path as needed

@Table({
  tableName: 'items_cart',
  timestamps: true,
})
export class CartItem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => AuthUser) // Use AuthUser here
  @Column({ allowNull: false, field: 'user_id' })
  userId: number;

  @BelongsTo(() => AuthUser) // Use AuthUser here
  user: AuthUser;

  @ForeignKey(() => AdminInventory)
  @Column({ allowNull: false, field: 'inventory_id' })
  inventoryId: number;

  @BelongsTo(() => AdminInventory)
  inventory: AdminInventory;

  @Column({ allowNull: false, defaultValue: 1 })
  quantity: number;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}