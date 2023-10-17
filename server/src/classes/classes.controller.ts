import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import {
  ClassParams,
  CreateClassDto,
  LessonParams,
  UpdateClassDto,
} from 'src/dtos/classes.dto';
import { RoleEnum, Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('api/teachers/classes')
@UseGuards(RoleGuard)
@Roles(RoleEnum.Teacher)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Get(':lessonId/students')
  getStudents(@Param() params: LessonParams) {
    return this.classesService.getStudents(params);
  }
  @Get(':lessonId')
  getClasses(@Param() params: LessonParams) {
    return this.classesService.getClasses(params);
  }
  @Post()
  createClass(@Body() body: CreateClassDto) {
    return this.classesService.createClass(body);
  }
  @Put(':classId')
  updateClass(@Param() params: ClassParams, @Body() body: UpdateClassDto) {
    return this.classesService.updateClass(params, body);
  }
  @Delete(':classId')
  deleteClass(@Param() params: ClassParams) {
    return this.classesService.deleteClass(params);
  }
}
