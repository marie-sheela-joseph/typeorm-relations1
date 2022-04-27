import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { UpdateEmployeeDto } from './dtos/update-employee.dto';

@Controller('employees')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createEmployee(@Body() body: CreateEmployeeDto) {
    return this.appService.createEmployee(body);
  }

  @Get()
  getEmployees() {
    return this.appService.getEmployees();
  }

  @Get('/:id')
  getEmployee(@Param('id') id: number) {
    return this.appService.getEmployee(id);
  }

  @Delete('/:id')
  deleteEmployee(@Param('id') id: number) {
    return this.appService.deleteEmployee(id);
  }

  @Patch('/:id')
  updateEmployee(@Param('id') id: number, @Body() body: UpdateEmployeeDto) {
    return this.appService.updateEmployee(id, body);
  }
}
