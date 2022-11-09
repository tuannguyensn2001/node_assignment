import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { WinstonModule } from 'nest-winston';
import { MongooseModule } from '@nestjs/mongoose';
import * as winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    CustomersModule,
    WinstonModule.forRoot({
      transports: [new winston.transports.Console()],
    }),
    MongooseModule.forRootAsync({
      useFactory(configService: ConfigService) {
        console.log(configService.get('MONGO_URL'));
        return {
          uri: configService.get('MONGO_URL'),
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.string().default('6000'),
        MONGO_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
