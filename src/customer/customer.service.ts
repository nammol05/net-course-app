/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async findAll() {
    //findALL() from last to first
    return await this.customerModel.findAll({
      order: [['id', 'desc']],
    });
  }

  async findOne(id: number) {
    return await this.customerModel.findByPk(id);
  }

  async findName(name: string) {
    return await this.customerModel.findOne({
      where: {
        // fullname: fullname, // must be exactly same
        name: {
          [Op.iLike]: `%${name}%`, // case insensitive
        },
      },
    });
  }

  async findFullname(fullname: string): Promise<Customer | null> {
    const customer = await this.customerModel.findOne({
      where: { fullname },
    });
  
    return customer ?? null;
  }

  async create(createCustomerDto: CreateCustomerDto) {
    return await this.customerModel.create(
      createCustomerDto as Partial<Customer>,
    );
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    // update -> return array of record
    return await this.customerModel.update(updateCustomerDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    // destroy -> return number of record
    return await this.customerModel.destroy({
      where: { id: id },
    });
  }
}