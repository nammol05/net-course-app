/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UtilityModule } from 'src/shared/utility/utility.module';

@Module({
  imports: [UtilityModule],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
