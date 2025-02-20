/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { UtilityService } from 'src/shared/utility/utility.service';
import { OrderService } from './order.service';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';

@Controller('order')
export class OrderController {
    constructor(private readonly utilityService: UtilityService,
        private readonly orderService: OrderService,
        private readonly globalHelperService: GlobalHelperService) {}

    @Get()
    orderFunc(): string {return this.orderService.orderFunc();}

    @Get('/shared')
    sharedFunc(): string {return this.utilityService.shareFunc();}

    @Get('/global')
    globalFunc(): string {return this.globalHelperService.globalFunc(); }
}
