/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'We love NestJS!';
  }

  getName(): string {
    return 'Nammon Koedbuathong';
  }

  myJSON() {
    return {
      name: 'Nammon',
      lastname: 'Koedbuathong',
      age: 19,
    };
  }

  getInfo(): string {
    return 'Hello, I am Nammon Koedbuathong, I\'m 19 years old'
  }

  gitTest() {
    return 'Git and GitHub using'
  }

  usePostman() {return 'we use postman'}
}
