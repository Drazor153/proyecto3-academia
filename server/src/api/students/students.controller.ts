import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import {
  CreateNewStudentDto,
  GetStudentGradesParams,
} from './dto/students.dto';
import { RoleEnum, Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRequest } from 'src/interfaces/request.interface';

@Controller('api/students')
@UseGuards(RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // @Get()
  // @Roles(RoleEnum.Admin)
  // getAllStudents() {
  //   return this.studentsService.getAllStudents(10, 2);
  // }

  @Get()
  @Roles(RoleEnum.Admin)
  getPaginatedStudents(
    @Query('size') size: string,
    @Query('page') page: string,
  ) {
    return this.studentsService.getStudents(+size, +page);
  }

  @Get('levels')
  @Roles(RoleEnum.Student)
  getLevels(@Req() req: UserRequest) {
    return this.studentsService.getLevels(req.user.sub);
  }

  @Get('grades/:year/:semester/:level')
  @Roles(RoleEnum.Student)
  GetStudentGrades(
    @Param() params: GetStudentGradesParams,
    @Req() req: UserRequest,
  ) {
    return this.studentsService.getStudentGrades({
      ...params,
      run: req.user.sub,
    });
  }

  @Post()
  @Roles(RoleEnum.Admin)
  createNewStudent(@Body() studentDto: CreateNewStudentDto) {
    return this.studentsService.createNewStudent(studentDto);
  }
}
