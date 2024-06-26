import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import {
  GetLevelsQuizzesParams,
  GetQuizGradesParams,
  PostQuizzesGradesBody,
} from './dto/teachers.dto';
import { RoleEnum, Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserRequest } from 'src/interfaces/request.interface';
import { PinoLogger } from 'nestjs-pino';

@Controller('api/teachers')
@UseGuards(RolesGuard)
@Roles(RoleEnum.Teacher, RoleEnum.Admin)
export class TeachersController {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(TeachersController.name);
  }

  @Get('levels')
  getTeacherLessons(@Req() req: UserRequest) {
    this.logger.info(`Teacher with run ${req.user.sub} is getting his lessons`);
    return this.teachersService.getTeacherLessons(req.user.sub, req.user.role);
  }

  @Get('grades/:year/:semester/:level')
  getLevelsQuizzes(@Param() params: GetLevelsQuizzesParams) {
    this.logger.info(
      `Teacher is getting quizzes from ${params.level}, ${params.year}, ${params.semester}`,
    );
    return this.teachersService.getLevelsQuizzes(params);
  }

  @Get('grades/quizzes/:quizId')
  getQuizGrades(@Param() params: GetQuizGradesParams) {
    this.logger.info(`Teacher is getting grades from quiz ${params.quizId}`);
    return this.teachersService.getQuizGrades(params);
  }

  @Post('grades/quizzes')
  postQuizzesGrades(@Body() body: PostQuizzesGradesBody) {
    this.logger.info(`Teacher is posting grades for quiz ${body.quizId}`);
    return this.teachersService.postQuizzesGrades(body);
  }
}
