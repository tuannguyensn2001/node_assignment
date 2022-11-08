import { IsNotEmpty } from 'class-validator';

export class UpdateCustomerDTO {
  @IsNotEmpty()
  address: string;
}
