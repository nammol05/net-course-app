import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { UtilityModule } from 'src/shared/utility/utility.module';

@Module({
  imports: [UtilityModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
