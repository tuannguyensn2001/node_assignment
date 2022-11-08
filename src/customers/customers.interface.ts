import { CreateCustomerDTO } from 'src/customers/dto/CreateCustomerDTO';
import Customer from 'src/entity/Customer';

export interface CustomerServiceInterface {
  create(input: CreateCustomerDTO): Promise<Customer>;
}

export interface CustomerRepositoryInterface {
  create(customer: CreateCustomerDTO): Promise<Customer>;
  findByName(name: string): Promise<Customer>;
}
