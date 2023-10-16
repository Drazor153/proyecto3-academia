import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LevelsService } from './levels.service';

@Controller('api/levels')
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get('/')
  getLevels(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(req.cookies);
    req;
    res;
    // res.cookie('cookieName', 'cookieValue', { httpOnly: true });
    return this.levelsService.getAllLevels();
  }
}
