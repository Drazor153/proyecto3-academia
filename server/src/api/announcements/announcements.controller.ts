import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import {  Roles } from '@/guards/roles.decorator';
import { RolesGuard } from '@/guards/roles.guard';
import {
  AnnouncementQuery,
  CreateAnnouncementDto,
  DeleteAnnouncementParams,
  UpdateAnnouncementDto,
} from './dto/announcement.dto';
import { PinoLogger } from 'nestjs-pino';
import { UserRequest } from '@/interfaces/request.interface';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '@/common/consts';

@ApiTags('Announcements')
@Controller('api/announcements')
@UseGuards(RolesGuard)
export class AnnouncementsController {
  constructor(
    private readonly announcementsService: AnnouncementsService,
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(AnnouncementsController.name);
  }

  @Get('categories-targets')
  @Roles(RoleEnum.Admin)
  getCategoriesTargets() {
    this.logger.info(`Admin getting categories for announcements`);
    return this.announcementsService.getCategoriesTargets();
  }

  @Get()
  getAnnouncements(@Req() req: UserRequest) {
    this.logger.info(`User getting announcements`);
    return this.announcementsService.getAnnouncements(req.user);
  }

  @Get('all')
  @Roles(RoleEnum.Admin)
  getAllAnnouncements(@Query() query: AnnouncementQuery) {
    this.logger.info(
      `Admin getting students with size: ${query.size} and page: ${query.page}`
    );
    return this.announcementsService.getAllAnnouncements(
      +query.size,
      +query.page
    );
  }

  @Post()
  @Roles(RoleEnum.Admin)
  async createAnnouncement(
    @Req() req: UserRequest,
    @Body() data: CreateAnnouncementDto
  ) {
    this.logger.info(`Admin creating announcement with data: ${data}`);
    const announcement = await this.announcementsService.createAnnouncement(
      req.user.sub,
      data
    );
    return { msg: 'Announcement created successfully', data: announcement.id };
  }

  @Put(':id')
  @Roles(RoleEnum.Admin)
  async updateAnnouncement(
    @Param() params: DeleteAnnouncementParams,
    @Body() data: UpdateAnnouncementDto
  ) {
    this.logger.info(`Admin updating announcement with id: ${params.id}`);
    await this.announcementsService.updateAnnouncement(+params.id, data);
    return {
      msg: 'Announcement updated successfully',
    };
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin)
  async deleteAnnouncement(@Param() params: DeleteAnnouncementParams) {
    this.logger.info(`Admin deleting announcement with id: ${params.id}`);
    await this.announcementsService.deleteAnnouncement(+params.id);
    return {
      msg: 'Announcement deleted successfully',
    };
  }
}
