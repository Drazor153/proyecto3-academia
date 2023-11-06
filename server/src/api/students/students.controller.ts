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
  PaginatedStudentsQuery,
  CreateNewStudentDto,
  GetStudentGradesParams,
  StudentCareerParams,
} from './dto/students.dto';
import { RoleEnum, Roles } from '@/guards/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import { UserRequest } from '@/interfaces/request.interface';
import { PinoLogger } from 'nestjs-pino';

@Controller('api/students')
@UseGuards(RolesGuard)
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(StudentsController.name);
  }

  // @Get()
  // @Roles(RoleEnum.Admin)
  // getAllStudents() {
  //   return this.studentsService.getAllStudents(10, 2);
  // }

  @Get()
  @Roles(RoleEnum.Admin)
  getPaginatedStudents(@Query() query: PaginatedStudentsQuery) {
    this.logger.info(
      `Admin getting students with size: ${query.size} and page: ${query.page}`,
    );
    return this.studentsService.getStudents(query);
  }
  @Get('career/:run')
  @Roles(RoleEnum.Admin)
  getStudentCareer(@Param() params: StudentCareerParams) {
    this.logger.info(`Admin getting student career with run: ${params.run}`);
    return this.studentsService.getStudentCareer(+params.run);
  }

  @Get('levels')
  @Roles(RoleEnum.Student)
  getLevels(@Req() req: UserRequest) {
    this.logger.info(`Student with run ${req.user.sub} is getting his levels`);
    return this.studentsService.getLevels(req.user.sub);
  }

  @Get('grades/:year/:semester/:level')
  @Roles(RoleEnum.Student)
  GetStudentGrades(
    @Param() params: GetStudentGradesParams,
    @Req() req: UserRequest,
  ) {
    this.logger.info(
      `Student with run ${req.user.sub} is getting his grades from ${params.level}, ${params.year}, ${params.semester}`,
    );
    return this.studentsService.getStudentGrades({
      ...params,
      run: req.user.sub,
    });
  }

  @Post()
  @Roles(RoleEnum.Admin)
  createNewStudent(@Body() studentDto: CreateNewStudentDto) {
    this.logger.info(
      `Admin creating new student with run: ${studentDto.run} and name: ${studentDto.name}`,
    );
    return this.studentsService.createNewStudent(studentDto);
  }
}
