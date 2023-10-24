import {
  Controller,
  Res,
  Post,
  Body,
  HttpStatus,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginFormDto } from './dto/auth.dto';
import { UserRequest } from 'src/interfaces/request.interface';
import { Public } from './roles.decorator';

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
}
