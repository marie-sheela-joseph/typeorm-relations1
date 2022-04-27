import { IsString } from 'class-validator';
export class UpdateEmployeeDto {
  @IsString()
  name: string;
}
