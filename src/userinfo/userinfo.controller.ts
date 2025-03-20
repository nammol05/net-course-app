/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('userinfo')
export class UserinfoController {
  constructor(private readonly userinfoService: UserinfoService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() createUserinfoDto: CreateUserinfoDto) {
    const createUserinfo = await this.userinfoService.create(createUserinfoDto);
    if (createUserinfo == null) {
      throw new NotFoundException('Can not Create Data!!!');
    }
    return {
      message: 'Create Data complete.',
      data: createUserinfo,
    };
  }

  @Get()
  findAll() {
    return this.userinfoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const finduserinfo = await this.userinfoService.findOne(+id);
    if (finduserinfo == null) {
      throw new NotFoundException('Not Found Data!!!');
    }
    return finduserinfo
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update/:id')
    async update(
      @Param('id') id: string,
      @Body() UpdateUserinfoDto: UpdateUserinfoDto,) {
        const [updateUserinfo] = await this.userinfoService.update(
          +id,
          UpdateUserinfoDto,
        );
        console.log(updateUserinfo);
        if (updateUserinfo === 0) {
          throw new NotFoundException('Not Found Data to Update!!!');
        }
        return { message: 'Update data complete'}
      }
  

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    const destroyUserinfo = await this.userinfoService.remove(+id);
    console.log(destroyUserinfo);
    if (destroyUserinfo == 0) {
      throw new NotFoundException('Not Found Data to remove!!!');
    }
    return {message: 'Remove Data complete'};
  }

  @Get('/findlastname/:lastname')
  async findLastname(@Param('lastname') lastname: string) {
    const findlastname = await this.userinfoService.findLastname(lastname);
    if (findlastname == null) {
      throw new NotFoundException('Not Found Data!!!');
    }
    return findlastname;
  }


}
