import { CreateCustomerDTO } from 'src/customers/dto/CreateCustomerDTO';
import Customer from 'src/entity/Customer';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';

export interface CustomerServiceInterface {
  create(input: CreateCustomerDTO): Promise<Customer>;

  getAll(): Promise<Customer[]>;

  getById(id: string): Promise<Customer>;

  deleteById(id: string);

  update(id: string, payload: UpdateCustomerDTO);
}

export interface CustomerRepositoryInterface {
  create(customer: CreateCustomerDTO): Promise<Customer>;

  findByName(name: string): Promise<Customer>;

  findAll(): Promise<Customer[]>;

  findById(id: string): Promise<Customer>;

  deleteById(id: string);

  update(id: string, payload: UpdateCustomerDTO);
}
