import { Controller, Get, UseGuards } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { RolesGuard } from '@/guards/roles.guard';
import { RoleEnum, Roles } from '@/guards/roles.decorator';
import { PinoLogger } from 'nestjs-pino';

@Controller('api/levels')
@UseGuards(RolesGuard)
@Roles(RoleEnum.Admin, RoleEnum.Student)
export class LevelsController {
  constructor(
    private readonly levelsService: LevelsService,
    private readonly logger: PinoLogger,
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
