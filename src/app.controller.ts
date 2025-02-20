/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/showname')
  getName(): string {
    return this.appService.getName();
  }

  @Get('/myJson')
  myJSON() {
    return this.appService.myJSON();
  }

  @Get('/showinfo')
  getInfo() {
    return this.appService.getInfo();
  }

  @Get('/showgit')
  gitTest() {
    return this.appService.gitTest();
  }

  @Get('/usepostman')
  usePostman() {
    return this.appService.usePostman();
  }
}
