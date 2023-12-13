import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JustificationService } from './justification.service';
import { PinoLogger } from 'nestjs-pino';
import {  Roles } from '@/guards/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import {
  CreateNewJustificationDto,
  GetJustificationsDto,
} from './dto/justification.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../../common/consts';

@ApiTags('Justification')
@Controller('api/justification')
@UseGuards(RolesGuard)
export class JustificationController {
  constructor(
    private readonly justificationService: JustificationService,
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(JustificationController.name);
  }

  @Get()
  @Roles(RoleEnum.Admin)
  getAllJustifications(@Query() query: GetJustificationsDto) {
    this.logger.info(`Getting all justifications`);
    return this.justificationService.getJustifications(query);
  }
  /*
  20.345.543-7
  19.678.876-K
  
  */
  @Post()
  @Roles(RoleEnum.Student, RoleEnum.Admin)
  createNewJustification(@Body() justificationDto: CreateNewJustificationDto) {
    this.logger.info(
      `Student with run: ${justificationDto.run} is creating a justification`
    );
    return this.justificationService.createNewJustification(justificationDto);
  }
}
