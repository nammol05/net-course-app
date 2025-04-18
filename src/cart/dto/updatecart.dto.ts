/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './createcart.dto';

export class UpdateInventoryDto extends PartialType(CreateCartDto) {}