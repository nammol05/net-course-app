/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { UtilityService } from 'src/shared/utility/utility.service';
import { ChatService } from './chat.service';
import { GlobalHelperService } from 'src/shared/global-helper/global-helper.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly utilityService: UtilityService,
        private readonly chatService: ChatService,
        private readonly globalHelperService: GlobalHelperService) {}

    @Get()
    chatFunc(): string {return this.chatService.chatFunc();}

    @Get('/shared')
    sharedFunc(): string {return this.utilityService.shareFunc();}

    @Get('/global')
    globalFunc(): string {return this.globalHelperService.globalFunc(); }
}
