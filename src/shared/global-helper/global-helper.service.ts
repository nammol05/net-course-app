/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalHelperService {
    globalFunc(): string {return 'Using global module';}
}
