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
import { UserRequest } from 'src/interfaces/request.interface';
import { Public, Roles, RoleEnum } from './roles.decorator';
import { RoleGuard } from './role.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
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

  @Get('auto-login')
  async autologin(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.authService.autologin(
      req.user.run,
      req.user.role,
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: true,
    });

    res.status(HttpStatus.ACCEPTED);
    return {
      userData: user,
    };
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      secure: true,
    });
    return {
      msg: 'Logout successful',
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Get('test')
  @UseGuards(RoleGuard)
  @Roles(RoleEnum.Teacher)
  testing(@Req() req: UserRequest) {
    return req.user;
  }

  @Get('test2')
  @UseGuards(RoleGuard)
  @Roles(RoleEnum.Student)
  testing2() {
    return ['test2'];
  }
}
