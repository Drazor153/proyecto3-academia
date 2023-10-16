import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  CreateNewStudentDto,
  GetClassesParams,
  GetLevelsParams,
  GetStudentGradesParams,
} from 'src/dtos/students.dto';

@Controller('api/students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }

  @Get('levels/:run')
  getLevels(@Param() params: GetLevelsParams) {
    return this.studentsService.getLevels(params.run);
  }

  @Get('classes/:lessonId/:run')
  GetClasses(@Param() params: GetClassesParams) {
    return this.studentsService.getClasses(params);
  }

  @Get('grades/:year/:semester/:level/:run')
  GetStudentGrades(@Param() params: GetStudentGradesParams) {
    return this.studentsService.getStudentGrades(params);
  }

  @Post()
  createNewStudent(@Body() studentDto: CreateNewStudentDto) {
    return this.studentsService.createNewStudent(studentDto);
  }
}
