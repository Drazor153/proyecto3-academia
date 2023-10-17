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
} from 'src/dtos/teachers.dto';
import { RoleEnum, Roles } from 'src/auth/roles.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { UserRequest } from 'src/interfaces/request.interface';

@Controller('api/teachers')
@UseGuards(RoleGuard)
@Roles(RoleEnum.Teacher)
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('levels')
  getTeacherLessons(@Req() req: UserRequest) {
    return this.teachersService.getTeacherLessons(req.user.run);
  }

  @Get('grades/:year/:semester/:level')
  getLevelsQuizzes(@Param() params: GetLevelsQuizzesParams) {
    return this.teachersService.getLevelsQuizzes(params);
  }

  @Get('grades/quizzes/:quizId')
  getQuizGrades(@Param() params: GetQuizGradesParams) {
    return this.teachersService.getQuizGrades(params);
  }

  @Post('grades/quizzes')
  postQuizzesGrades(@Body() body: PostQuizzesGradesBody) {
    return this.teachersService.postQuizzesGrades(body);
  }
}
