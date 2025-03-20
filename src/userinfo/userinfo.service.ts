/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';
import { Userinfo } from './entities/userinfo.entity';
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UserinfoService {
  constructor(
    @InjectModel(Userinfo)
    private userInfoModel: typeof Userinfo,
  ) {}

  async create(createUserinfoDto: CreateUserinfoDto) {
    return await this.userInfoModel.create(
      createUserinfoDto as unknown as Partial<Userinfo>,
    );
  }

  async findAll() {
    return await this.userInfoModel.findAll();
  }

  async findOne(id: number) {
    return await this.userInfoModel.findByPk(id);
  }

  async update(id: number, updateUserinfoDto: UpdateUserinfoDto) {
      return await this.userInfoModel.update(updateUserinfoDto, {
        where: {id: id},
      });
    }

  async remove(id: number) {
    return await this.userInfoModel.destroy({
      where: {id: id},
    });
  }

  async findLastname(lastname: string){
    return await this.userInfoModel.findOne({
      where: {
        lastname: lastname,
      },
    });
  }


}
