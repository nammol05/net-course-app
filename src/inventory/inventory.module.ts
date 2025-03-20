/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminInventory } from './entities/admin-inventory.entity';

@Module({
  imports: [SequelizeModule.forFeature([AdminInventory])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
