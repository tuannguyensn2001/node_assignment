import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { MongooseModule } from '@nestjs/mongoose';
import Customer, { CustomerSchema } from 'src/entity/Customer';
import CustomersRepository from 'src/customers/customers.repository';

@Module({
  controllers: [CustomersController],
  providers: [
    {
      provide: 'CustomerService',
      useClass: CustomersService,
    },
    {
      provide: 'CustomerRepository',
      useClass: CustomersRepository,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
})
export class CustomersModule {}
