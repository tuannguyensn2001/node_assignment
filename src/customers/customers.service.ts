import {
  ConflictException,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import {
  CustomerRepositoryInterface,
  CustomerServiceInterface,
} from 'src/customers/customers.interface';
import { CreateCustomerDTO } from 'src/customers/dto/CreateCustomerDTO';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import Customer from 'src/entity/Customer';

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
    this.logger.log(customer);
    if (Boolean(customer)) {
      throw new ConflictException('customer existed');
    }
    const result = await this.customerRepository.create(input);
    return result;
  }
}
