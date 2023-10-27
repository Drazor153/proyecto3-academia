import { Controller, Get, UseGuards } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleEnum, Roles } from 'src/guards/roles.decorator';
import { PinoLogger } from 'nestjs-pino';

@Controller('api/levels')
@UseGuards(RolesGuard)
@Roles(RoleEnum.Admin)
export class LevelsController {
  constructor(
    private readonly levelsService: LevelsService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(LevelsController.name);
  }

  @Get('/')
  async getLevels() {
    this.logger.info('Admin getting all academic levels');
    const levels = await this.levelsService.getAllLevels();
    return { data: levels };
  }
}
