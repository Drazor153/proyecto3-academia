import {
  Controller,
  Res,
  Post,
  Body,
  HttpStatus,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginFormDto } from '../dtos/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserRequest } from 'src/interfaces/request.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginFormDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, userData } = await this.authService.login(
      loginDto.run,
      loginDto.password,
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: true,
    });

    res.status(HttpStatus.ACCEPTED);
    return {
      userData,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  testing(@Req() req: UserRequest) {
    return req.user;
  }
}
