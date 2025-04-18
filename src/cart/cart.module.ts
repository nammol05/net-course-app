/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './entities/itemcart.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
