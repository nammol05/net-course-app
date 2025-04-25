/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Request, UseGuards, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request as ExpressRequest } from 'express';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
async getCart(@Request() req: ExpressRequest) {
  // Manually set userId for testing
  const userId = 1;  // Set this to a valid userId for testing
  console.log('User ID for testing:', userId);

  if (!userId) {
    console.error('User ID not found in req.user during getCart');
    throw new UnauthorizedException('User not authenticated');
  }

  try {
    console.log('Fetching cart for userId:', userId);
    return this.cartService.getCartItems(userId.toString());
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new InternalServerErrorException('Failed to fetch cart items');
  }
}

  @Post()
// @UseGuards(JwtAuthGuard)
async addItemToCart(
  @Request() req: ExpressRequest,
  @Body() body: { inventory_id: number; quantity: number }
) {
  // const authUser = req.user as any;
  // const userId = authUser?.user_id;
  const userId = 1; // 👈 Temporarily hardcoded user ID for testing

  const { inventory_id, quantity } = body;

  try {
    const cartItem = await this.cartService.addItemToCart(userId.toString(), inventory_id, quantity);
    return { message: 'Item added to cart successfully', cartItem };
  } catch (error) {
    console.error('Error adding item to cart:', error.message);
    throw new InternalServerErrorException(error.message);
  }
}
}