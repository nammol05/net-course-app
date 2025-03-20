/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateItemDto) {}