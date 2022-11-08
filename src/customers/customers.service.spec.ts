import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CreateCustomerDTO } from './dto/CreateCustomerDTO';
import Customer from '../entity/Customer';
import { ConflictException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { when } from 'jest-when';

describe('CustomersService', () => {
  let service: CustomersService;

  const mockRepository = {
    create: jest.fn(),
    findByName: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: 'CustomerRepository',
          useValue: mockRepository,
        },
        {
          provide: WINSTON_MODULE_NEST_PROVIDER,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be throw exception when create existed customer', async function () {
    const info = { name: 'existed' };
    const input = plainToClass(CreateCustomerDTO, info);
    const findByName = jest.spyOn(mockRepository, 'findByName');
    findByName.mockImplementation((name: string) => Promise.resolve(null));
    when(findByName)
      .calledWith(input.name)
      .mockResolvedValue(Promise.resolve(new Customer()));
    await expect(service.create(input)).rejects.toBeInstanceOf(
      ConflictException,
    );
  });
});
