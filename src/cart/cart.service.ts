/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cart } from './entities/itemcart.entity';
import { CreateCartDto } from './dto/createcart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private readonly cartModel: typeof Cart,
  ) {}

  async addItem(createCartDto: CreateCartDto): Promise<Cart> {
    const { itemname, quantity } = createCartDto;

    const existingItem = await this.cartModel.findOne({ where: { itemname } });

    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem.save();
    }

    return this.cartModel.create({ itemname, quantity });
  }
}