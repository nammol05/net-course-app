/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    chatFunc(): string {return 'Using chat function'}
}
