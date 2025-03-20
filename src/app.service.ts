/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { 
      name: 'Nammon Koedbuathong',
      age: 19,
      email: 'nammol05@gmail.com',
      hobby: 'Gaming'
    };
  }

  getName(): string {
    return 'Nammon Koedbuathong';
  }

  myJSON() {
    return {
      name: 'Nammon',
      lastname: 'Koedbuathong',
      age: 19,
      version: process.env.API_VERSION,
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
