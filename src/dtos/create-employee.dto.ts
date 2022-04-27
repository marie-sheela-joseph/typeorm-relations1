import { IsNumber, IsString, IsEmail } from 'class-validator';
import { Meeting } from 'src/meeting.entity';
import { Task } from 'src/task.entity';

export class CreateEmployeeDto {
  @IsString()
  name: string;

  @IsNumber()
  phone: number;

  @IsEmail()
  email: string;

  tasks: Task[];

  meetings: Meeting[];
}
