import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCustomerDTO } from 'src/customers/dto/CreateCustomerDTO';
import { CustomerServiceInterface } from 'src/customers/customers.interface';
import { UpdateCustomerDTO } from './dto/UpdateCustomerDTO';

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

  @Get('/')
  async index() {
    const result = await this.customerService.getAll();

    return {
      message: 'done',
      data: result,
    };
  }

  @Get('/:id')
  async show(@Param('id') id: string) {
    const result = await this.customerService.getById(id);

    return {
      message: 'get customer successfully',
      data: result,
    };
  }

  @Delete('/:id')
  async destroy(@Param('id') id: string) {
    await this.customerService.deleteById(id);
    return {
      message: 'delete successfully',
    };
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() payload: UpdateCustomerDTO) {
    await this.customerService.update(id, payload);
    return {
      message: 'update successfully',
    };
  }
}
