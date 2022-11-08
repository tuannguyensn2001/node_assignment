import {
  ConflictException,
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import {
  CustomerRepositoryInterface,
  CustomerServiceInterface,
} from 'src/customers/customers.interface';
import { CreateCustomerDTO } from 'src/customers/dto/CreateCustomerDTO';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import Customer from 'src/entity/Customer';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';

@Injectable()
export class CustomersService implements CustomerServiceInterface {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @Inject('CustomerRepository')
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async create(input: CreateCustomerDTO): Promise<Customer> {
    const customer = await this.customerRepository.findByName(input.name);
    if (Boolean(customer)) {
      throw new ConflictException('customer existed');
    }
    const result = await this.customerRepository.create(input);
    return result;
  }

  async getAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async getById(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!Boolean(customer)) {
      throw new NotFoundException('customer not found');
    }

    return customer;
  }

  async deleteById(id: string) {
    const customer = await this.customerRepository.findById(id);
    if (!Boolean(customer)) {
      throw new NotFoundException('customer not found');
    }
    await this.customerRepository.deleteById(id);
  }

  async update(id: string, payload: UpdateCustomerDTO) {
    const customer = await this.customerRepository.findById(id);
    if (!Boolean(customer)) {
      throw new NotFoundException('customer not found');
    }
    await this.customerRepository.update(id, payload);
  }
}
