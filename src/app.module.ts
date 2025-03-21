/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UtilityModule } from './shared/utility/utility.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ChatModule } from './chat/chat.module';
import { GlobalHelperModule } from './shared/global-helper/global-helper.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { Customer } from './customer/entities/customer.entity';
import { Userinfo } from './userinfo/entities/userinfo.entity';
import { UserinfoModule } from './userinfo/userinfo.module';
import { AuthModule } from './auth/auth.module';
import { AuthUser } from './auth/entities/auth.entity';
import { AdminModule } from './admin/admin.module';
import { InventoryModule } from './inventory/inventory.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect :process.env.DB_DIALECT as Dialect,
      host : process.env.DB_HOST,
      port : Number(process.env.DB_PORT),
      username : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
      models : [Userinfo, Customer, AuthUser],
      autoLoadModels: true,
      sync: {alter: true},
    }),
    ProductModule, UtilityModule, UserModule,OrderModule, ChatModule, GlobalHelperModule, CustomerModule, UserinfoModule, AuthModule, AdminModule, InventoryModule, CartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
