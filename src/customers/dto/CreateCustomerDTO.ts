import { IsNotEmpty } from 'class-validator';

export class CreateCustomerDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;
}
