/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './entities/itemcart.entity';
import { AdminInventory } from '../inventory/entities/inventory.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartItem) private cartItemModel: typeof CartItem,
    @InjectModel(AdminInventory) private inventoryModel: typeof AdminInventory
  ) {}

  async getCartItems(userId: string) {
    console.log('Fetching cart items for userId:', userId);
    try {
      return await this.cartItemModel.findAll({
        where: { userId }, 
        include: [this.inventoryModel],
      });
    } catch (error) {
      console.error('Error in fetching cart items for userId:', userId, error);
      throw new Error('Error fetching cart items');
    }
  }

  async addItemToCart(userId: string, inventoryId: number, quantity: number) {
    console.log('Adding item to cart - userId:', userId, 'inventoryId:', inventoryId, 'quantity:', quantity);

    try {
      const inventoryItem = await this.inventoryModel.findByPk(inventoryId);
      if (!inventoryItem) {
        console.log('Inventory item not found, inventoryId:', inventoryId);
        throw new Error('Item not found in inventory');
      }

      const existingCartItem = await this.cartItemModel.findOne({
        where: { userId, inventoryId }, 
      });

      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
        console.log('Updated cart item quantity for userId:', userId, 'inventoryId:', inventoryId);
        return existingCartItem;
      } else {
        const cartItem = await this.cartItemModel.create({
          userId,        
          inventoryId,   
          quantity,
        });
        console.log('New cart item created for userId:', userId, 'inventoryId:', inventoryId);
        return cartItem;
      }
    } catch (error) {
      console.error('Error in addItemToCart:', error);
      throw new InternalServerErrorException('Something went wrong while adding item to cart.');
    }
  }
}