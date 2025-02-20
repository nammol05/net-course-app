/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    userFunc(): string {return 'Using user function'}
}
