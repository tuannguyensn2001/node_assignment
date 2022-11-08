import { Injectable } from '@nestjs/common';
import { CustomerRepositoryInterface } from 'src/customers/customers.interface';
import { CreateCustomerDTO } from 'src/customers/dto/CreateCustomerDTO';
import Customer, { CustomerDocument } from 'src/entity/Customer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export default class CustomersRepository
  implements CustomerRepositoryInterface
{
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  create(customer: CreateCustomerDTO): Promise<Customer> {
    const result = new this.customerModel(customer);
    return result.save();
  }

  findByName(name: string): Promise<Customer> {
    return this.customerModel.findOne({ name }).exec();
  }
}
