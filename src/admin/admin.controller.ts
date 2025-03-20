/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  async loginAdmin(@Body() body: { email: string; password: string }) {
    return this.adminService.loginAdmin(body.email, body.password);
  }
}