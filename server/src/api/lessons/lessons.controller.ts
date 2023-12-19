import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LessonParams } from '@/api/classes/classes.dto';
import { LessonsService } from './lessons.service';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles';
import { UserRequest } from '@/interfaces/request.interface';
import { PinoLogger } from 'nestjs-pino';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '@common/constants';
import { CreateLessonsDto } from './lessons.dto';

@ApiTags('Lessons')
@Controller('api/lesson')
@UseGuards(RolesGuard)
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(LessonsController.name);
  }

  @Get(':lessonId/students')
  @Roles(RoleEnum.Teacher, RoleEnum.Admin)
  getStudents(@Param() params: LessonParams) {
    this.logger.info(`Teacher getting students from lesson ${params.lessonId}`);
    return this.lessonsService.getStudents(params);
  }

  @Get(':lessonId/classes')
  @Roles(RoleEnum.Teacher, RoleEnum.Admin, RoleEnum.Student)
  getClasses(@Req() req: UserRequest, @Param() params: LessonParams) {
    this.logger.info(`User getting classes from lesson ${params.lessonId}`);
    return this.lessonsService.getClasses(req, params);
  }

  @Post('')
  @Roles(RoleEnum.Admin)
  createLessons(@Body() createLessonDto: CreateLessonsDto){
    this.logger.info(`Admin creating lessons`);
    return this.lessonsService.createLessons(createLessonDto);
  }
}
