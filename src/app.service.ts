import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Employee } from './employee.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
  ) {}

  async createEmployee(body) {
    console.log(body);
    //create + save =>contact info, tasks, meetings; create a employee, add contact info, add tasks, add meetings, save employee
    const employee1ContactInfo = this.contactInfoRepo.create({
      phone: body.phone,
      email: body.email,
    });
    this.contactInfoRepo.save(employee1ContactInfo);

    const employee1Task1 = this.taskRepo.create({ name: body.tasks[0].name });
    await this.taskRepo.save(employee1Task1);

    const employee1Task2 = this.taskRepo.create({ name: body.tasks[1].name });
    await this.taskRepo.save(employee1Task2);

    const employee1Meeting1 = this.meetingRepo.create({
      zoomUrl: body.meetings[0].zoomUrl,
    });
    await this.meetingRepo.save(employee1Meeting1);

    const employee1Meeting2 = this.meetingRepo.create({
      zoomUrl: body.meetings[1].zoomUrl,
    });
    await this.meetingRepo.save(employee1Meeting2);

    const employee1 = this.employeeRepo.create({ name: body.name });
    employee1.contactInfo = employee1ContactInfo;
    employee1.tasks = [employee1Task1, employee1Task2];
    employee1.meetings = [employee1Meeting1, employee1Meeting2];
    return await this.employeeRepo.save(employee1);
  }

  async getEmployees() {
    return this.employeeRepo.find({
      relations: ['contactInfo', 'tasks', 'meetings'],
    });
  }

  async getEmployee(id) {
    return this.employeeRepo.find(id);
  }

  async deleteEmployee(id) {
    return this.employeeRepo.delete(id);
  }

  async updateEmployee(id, attrs) {
    return this.employeeRepo.update(id, attrs);
  }
}
