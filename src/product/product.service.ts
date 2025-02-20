/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
    productFunc1(): string {return 'Showing product function 1'}

    productFunc2(): string {return 'Showing product function 2'}

    productJSON() {return {name: 'Nammon',age: 19,hobby: 'Gaming',}}
}
