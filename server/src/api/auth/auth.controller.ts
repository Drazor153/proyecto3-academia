import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieOptions, Response } from 'express';
import {
  ChangePasswordDto,
  LoginFormDto,
  ResetPasswordParams,
} from './auth.dto';
import { UserRequest } from '@/interfaces/request.interface';
import { NoAccess, NoRefresh, Roles } from '@/decorators/roles';
import { PinoLogger } from 'nestjs-pino';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../guards/roles.guard';
import { RoleEnum } from '../../common/constants';

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  secure: true,
};

@ApiTags('Authorization')
@UseGuards(RolesGuard)
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
  async autoLogin(
    @Req() req: UserRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    this.logger.info(`User with run ${req.user.sub} is auto-logging in.`);
    const { tokens, user } = await this.authService.autoLogin(req.user.sub);

    res.cookie('access-token', tokens.accessToken, COOKIE_OPTIONS);
    // res.cookie('refresh-token', tokens.refreshToken, COOKIE_OPTIONS);

    res.status(HttpStatus.ACCEPTED);
    return {
      userData: user,
    };
  }

  @ApiOkResponse({ description: 'logout_successful' })
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
      msg: 'logout_successful',
    };
  }

  @ApiOkResponse({ description: 'tokens_refreshed' })
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
      msg: 'tokens_refreshed',
    };
  }

  @ApiOkResponse({ description: 'password_change_successful' })
  @Patch('change-password')
  async changePassword(
    @Req() req: UserRequest,
    @Body() body: ChangePasswordDto
  ) {
    this.logger.info(`User with run ${req.user.sub} is changing password.`);
    return this.authService.changePassword(
      req.user.sub,
      body.oldPassword,
      body.newPassword
    );
  }
  @ApiOkResponse({ description: 'password_reset_successful' })
  @Patch('reset-password/:run')
  @Roles(RoleEnum.Admin)
  resetPassword(@Param() body: ResetPasswordParams) {
    this.logger.info(`User with run ${body.run} is resetting password.`);
    return this.authService.resetUserPassword(+body.run);
  }
}
