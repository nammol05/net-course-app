/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminInventory } from './entities/admin-inventory.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateItemDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';


@Injectable()
export class InventoryService {
    constructor(
        @InjectModel(AdminInventory)
        private adminInventoryRepository: typeof AdminInventory,
     ){}

    async createItem(newItem: CreateItemDto) {
        try {
            const createdItem = await this.adminInventoryRepository.create({
            itemname: newItem.itemname,
            cost: newItem.cost,
            descrip: newItem.descrip,
            quantity: newItem.quantity,
        });
    
        return {
            success: true,
            message: 'Item created successfully',
            data: createdItem,
        };
        } 
        catch (error: unknown) {
            if (error instanceof Error) {
            throw new Error(`Failed to create item: ${error.message}`);
        }
        throw new Error('Failed to create item: Unknown error occurred.');
        }
    }

    async deleteItem(id: number) {
        const item = await this.adminInventoryRepository.findByPk(id);
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
    
        await item.destroy();
        return {
            success: true,
            message: `Item with ID ${id} deleted successfully`,
        };
    }

      async updateItem(id: number, updateData: UpdateInventoryDto) {
        const item = await this.adminInventoryRepository.findByPk(id);
    
        if (!item) 
        {throw new NotFoundException(`Item with ID ${id} not found`);}
    
        await item.update(updateData);
        return {
          success: true,
          message: `Item with ID ${id} updated successfully`,
          data: item,
        };
    }

    async getAllItems() {
        return await this.adminInventoryRepository.findAll(); 
    }
}
