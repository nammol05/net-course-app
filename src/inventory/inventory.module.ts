/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminInventory } from './entities/inventory.entity'; 
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [SequelizeModule.forFeature([AdminInventory])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [SequelizeModule], 
})
export class InventoryModule {}