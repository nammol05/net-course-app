/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {return 'Displaying getHello()';}

  getName(): string {return 'Displaying getName()';}

  myJSON(): string {return 'Displaying myJSON()';}

  getInfo(): string {return 'Displaying getInfo()';}

  gitTest() {return 'Git and GitHub using'}

  usePostman() {return 'we use postman'}

}
