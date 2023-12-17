import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieOptions, Response } from 'express';
import { LoginFormDto } from './auth.dto';
import { UserRequest } from '@/interfaces/request.interface';
import { NoAccess, NoRefresh } from '@/guards/roles.decorator';
import { PinoLogger } from 'nestjs-pino';
import { ApiTags } from '@nestjs/swagger';

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  secure: true,
};

@ApiTags('Authorization')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: PinoLogger
  ) {
    this.logger.setContext(AuthController.name);
  }

  @Post('login')
  @NoAccess()
  @NoRefresh()
  async login(
    @Body() loginDto: LoginFormDto,
    @Res({ passthrough: true }) res: Response
  ) {
    this.logger.info(`User with run ${loginDto.run} is logging in.`);
    const { tokens, userData } = await this.authService.login(
      loginDto.run,
      loginDto.password
    );

    res.cookie('access-token', tokens.accessToken, COOKIE_OPTIONS);
    res.cookie('refresh-token', tokens.refreshToken, COOKIE_OPTIONS);

    res.status(HttpStatus.ACCEPTED);
    return {
      userData,
    };
  }

  @Get('auto-login')
  async autologin(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    this.logger.info(`User with run ${req.user.sub} is autologging in.`);
    const { tokens, user } = await this.authService.autologin(req.user.sub);

    res.cookie('access-token', tokens.accessToken, COOKIE_OPTIONS);
    // res.cookie('refresh-token', tokens.refreshToken, COOKIE_OPTIONS);

    res.status(HttpStatus.ACCEPTED);
    return {
      userData: user,
    };
  }

  @Get('logout')
  async logout(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    this.logger.info(`User with run ${req.user.sub} is logging out.`);
    await this.authService.logout(req.user.sub);
    res.clearCookie('access-token', COOKIE_OPTIONS);
    res.clearCookie('refresh-token', COOKIE_OPTIONS);
    return {
      msg: 'Logout successful',
    };
  }

  @Get('refresh')
  @NoAccess()
  async refreshTokens(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    this.logger.info(`User with run ${req.user.sub} is refreshing tokens.`);
    const { sub: run, refreshToken } = req.user;
    const tokens = await this.authService.refreshTokens(run, refreshToken);

    res.cookie('access-token', tokens.accessToken, COOKIE_OPTIONS);
    res.status(HttpStatus.ACCEPTED);

    return {
      msg: 'Tokens refreshed',
    };
  }
}
