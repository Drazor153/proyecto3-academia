import { Controller, Get, UseGuards } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { RoleEnum, Roles } from 'src/guards/roles.decorator';

@Controller('api/levels')
@UseGuards(RolesGuard)
@Roles(RoleEnum.Admin)
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get('/')
  async getLevels() {
    const levels = await this.levelsService.getAllLevels();
    return { data: levels };
  }
}
