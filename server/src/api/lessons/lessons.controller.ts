import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { LessonParams } from 'src/api/classes/dto/classes.dto';
import { LessonsService } from './lessons.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleEnum, Roles } from 'src/guards/roles.decorator';
import { UserRequest } from 'src/interfaces/request.interface';
import { PinoLogger } from 'nestjs-pino';

@Controller('api/lesson')
@UseGuards(RolesGuard)
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly logger: PinoLogger,
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
    this.logger.info(`Teacher getting classes from lesson ${params.lessonId}`);
    return this.lessonsService.getClasses(req, params);
  }
}
