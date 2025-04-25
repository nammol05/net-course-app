/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './entities/itemcart.entity';
import { InventoryModule } from '../inventory/inventory.module'; 

@Module({
  imports: [
    SequelizeModule.forFeature([CartItem]), 
    InventoryModule, 
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}