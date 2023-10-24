import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { LessonParams } from 'src/classes/dto/classes.dto';
import { LessonsService } from './lessons.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RoleEnum, Roles } from 'src/auth/roles.decorator';
import { UserRequest } from 'src/interfaces/request.interface';

@Controller('api/lesson')
@UseGuards(RoleGuard)
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get(':lessonId/students')
  @Roles(RoleEnum.Teacher, RoleEnum.Admin)
  getStudents(@Param() params: LessonParams) {
    return this.lessonsService.getStudents(params);
  }

  @Get(':lessonId/classes')
  @Roles(RoleEnum.Teacher, RoleEnum.Admin, RoleEnum.Student)
  getClasses(@Req() req: UserRequest, @Param() params: LessonParams) {
    return this.lessonsService.getClasses(req, params);
  }
}
