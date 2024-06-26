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
import { PinoLogger } from 'nestjs-pino';

@Controller('api/classes')
@UseGuards(RolesGuard)
@Roles(RoleEnum.Teacher, RoleEnum.Admin)
export class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(ClassesController.name);
  }

  @Post()
  createClass(@Body() body: CreateClassDto) {
    this.logger.info(`Teacher creating class`);
    return this.classesService.createClass(body);
  }

  @Put(':classId')
  updateClass(@Param() params: ClassParams, @Body() body: UpdateClassDto) {
    this.logger.info(`Teacher updating class ${params.classId}`);
    return this.classesService.updateClass(params, body);
  }

  @Delete(':classId')
  deleteClass(@Param() params: ClassParams) {
    this.logger.info(`Teacher deleting class ${params.classId}`);
    return this.classesService.deleteClass(params);
  }
}
