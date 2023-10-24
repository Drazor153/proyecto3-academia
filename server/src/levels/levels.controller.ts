import { Controller, Get, UseGuards } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RoleEnum, Roles } from 'src/auth/roles.decorator';

@Controller('api/levels')
@UseGuards(RoleGuard)
@Roles(RoleEnum.Admin)
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get('/')
  async getLevels() {
    const levels = await this.levelsService.getAllLevels();
    return { data: levels };
  }
}
