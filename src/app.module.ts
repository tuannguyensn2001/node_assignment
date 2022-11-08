import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CustomersModule,
    WinstonModule.forRoot({}),
    MongooseModule.forRoot('mongodb://localhost/demo'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
