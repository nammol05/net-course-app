/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Delete, Param, Patch, Get, Render } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateItemDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @Get()
    @Render('inventoryindex') 
    async getInventory() {
        try {
            const items = await this.inventoryService.getAllItems();
            return { items };
        } catch (error) {
            console.error('Error fetching inventory:', error);
            return { items: [], error: 'Failed to load inventory' };
        }
    }

    @Post('/create')
    async createItem(@Body() newItem: CreateItemDto) { 
    return this.inventoryService.createItem(newItem);}

    @Delete('/delete/:id')
    async deleteItem(@Param('id') id: number) {
    return this.inventoryService.deleteItem(id);}

    @Patch('/update/:id') 
    async updateItem(@Param('id') id: number, @Body() updateData: UpdateInventoryDto) {
    return this.inventoryService.updateItem(id, updateData);}

}
