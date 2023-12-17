import { Controller, Get, UseGuards } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { RolesGuard } from '@/guards/roles.guard';
import { Roles } from '@/guards/roles.decorator';
import { PinoLogger } from 'nestjs-pino';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../../common/constants';

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
}
