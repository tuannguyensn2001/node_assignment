import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateCustomerDTO } from 'src/customers/dto/CreateCustomerDTO';
import { CustomerServiceInterface } from 'src/customers/customers.interface';

@Controller({
  version: '1',
  path: 'customers',
})
export class CustomersController {
  constructor(
    @Inject('CustomerService')
    private customerService: CustomerServiceInterface,
  ) {}

  @Post('/')
  async create(@Body() input: CreateCustomerDTO) {
    const customer = await this.customerService.create(input);
    return {
      message: ' create successfully',
      data: customer,
    };
  }
}
