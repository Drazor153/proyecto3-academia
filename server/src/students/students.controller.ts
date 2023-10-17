import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  CreateNewStudentDto,
  GetClassesParams,
  GetStudentGradesParams,
} from 'src/dtos/students.dto';
import { RoleEnum, Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { UserRequest } from 'src/interfaces/request.interface';

@Controller('api/students')
@UseGuards(RoleGuard)
@Roles(RoleEnum.Student)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  getAllStudents() {
    return this.studentsService.getAllStudents();
  }

  @Get('levels')
  getLevels(@Req() req: UserRequest) {
    return this.studentsService.getLevels(req.user.run);
  }

  @Get('classes/:lessonId')
  GetClasses(@Param() params: GetClassesParams, @Req() req: UserRequest) {
    return this.studentsService.getClasses({
      lessonId: params.lessonId,
      run: req.user.run,
    });
  }

  @Get('grades/:year/:semester/:level')
  GetStudentGrades(
    @Param() params: GetStudentGradesParams,
    @Req() req: UserRequest,
  ) {
    return this.studentsService.getStudentGrades({
      ...params,
      run: req.user.run,
    });
  }

  @Post()
  createNewStudent(@Body() studentDto: CreateNewStudentDto) {
    return this.studentsService.createNewStudent(studentDto);
  }
}
