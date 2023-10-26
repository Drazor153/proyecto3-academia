import {
  Controller,
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
  UpdateClassDto,
} from 'src/api/classes/dto/classes.dto';
import { RoleEnum, Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('api/classes')
@UseGuards(RolesGuard)
@Roles(RoleEnum.Teacher, RoleEnum.Admin)
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

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
