import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/decorators/roles';
import { PinoLogger } from 'nestjs-pino';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../../common/constants';
import { PeriodDto } from './levels.dto';

@ApiTags('Levels')
@Controller('api/levels')
@UseGuards(RolesGuard)
@Roles(RoleEnum.Admin, RoleEnum.Student)
export class LevelsController {
  constructor(
    private readonly levelsService: LevelsService,
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(LevelsController.name);
  }

  @Get('/')
  async getAllLevels() {
    this.logger.info('Admin getting all academic levels');
    const levels = await this.levelsService.getAllLevels();
    return { data: levels };
  }

  @Get('/topics')
  getTopics() {
    this.logger.info('Admin getting all topics');
    return this.levelsService.getTopics();
  }

  @Get('/teachers')
  getTeachers() {
    this.logger.info('Admin getting all teachers');
    return this.levelsService.getTeachers();
  }

  @Get('/periods')
  getPeriods() {
    this.logger.info('Admin getting all periods');
    return this.levelsService.getPeriods();
  }

  @Post('/periods')
  createPeriod(@Body() period: PeriodDto) {
    this.logger.info('Admin creating a new period');
    return this.levelsService.createPeriod(period);
  }
}
