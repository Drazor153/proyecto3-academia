import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JustificationService } from './justification.service';
import { PinoLogger } from 'nestjs-pino';
import { Roles } from '@/guards/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import {
  CreateNewJustificationDto,
  GetJustificationsDto,
  SetJustificationStatusDto,
  SetJustificationStatusParams,
} from './justification.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../../common/constants';
import { UserRequest } from '../../interfaces/request.interface';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('all')
  @Roles(RoleEnum.Admin)
  getAllJustifications(@Query() query: GetJustificationsDto) {
    this.logger.info(`Getting all justifications`);
    return this.justificationService.getAllJustifications(query);
  }
  /*
  20.345.543-7
  19.678.876-K
  
  */
  @Get()
  @Roles(RoleEnum.Student)
  getOwnJustifications(@Req() req: UserRequest) {
    this.logger.info(
      `Student with run: ${req.user.sub} is getting his justifications`
    );
    return this.justificationService.getOwnJustifications(req.user.sub);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Roles(RoleEnum.Student, RoleEnum.Admin)
  createNewJustification(
    @Req() req: UserRequest,
    @Body() justificationDto: CreateNewJustificationDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    this.logger.info(
      `Student with run: ${req.user.sub} is creating a justification`
    );
    return this.justificationService.createNewJustification(
      req.user.sub,
      file,
      justificationDto
    );
  }

  @Patch('/:id')
  @Roles(RoleEnum.Admin)
  setJustificationStatus(
    @Param() params: SetJustificationStatusParams,
    @Body() justificationDto: SetJustificationStatusDto
  ) {
    this.logger.info(`Updating justification with id: ${params.id}`);
    return this.justificationService.setJustificationApproved(
      +params.id,
      justificationDto.status
    );
  }
}
