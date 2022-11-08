import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';
import * as winston from 'winston';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CustomersModule,
    WinstonModule.forRoot({
      transports: [new winston.transports.Console()],
    }),
    MongooseModule.forRoot('mongodb://localhost/demo'),
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
