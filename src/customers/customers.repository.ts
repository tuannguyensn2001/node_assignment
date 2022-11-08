import { Injectable } from '@nestjs/common';
import { CustomerRepositoryInterface } from 'src/customers/customers.interface';
import { CreateCustomerDTO } from 'src/customers/dto/CreateCustomerDTO';
import Customer, { CustomerDocument } from 'src/entity/Customer';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';

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

  findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  findById(id: string): Promise<Customer> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return this.customerModel.findById(id).exec();
  }

  deleteById(id: string) {
    return this.customerModel.deleteOne({ _id: id }).exec();
  }

  update(id: string, payload: UpdateCustomerDTO) {
    return this.customerModel.updateOne(
      { _id: id },
      {
        address: payload.address,
      },
    );
  }
}
