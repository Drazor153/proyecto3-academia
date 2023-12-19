import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from '@/config/config';
import { comparePassword, hashPassword } from '@/common/bcrypt';
import { UsersRepo } from '@repos';
import { RoleEnum } from '@/common/constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersRepo: UsersRepo
  ) {}

  async login(run: number, password: string) {
    const user = await this.usersRepo.findOne(run);

    if (!user) {
      throw new BadRequestException({ type: 'msg', message: 'user_not_found' });
    }

    const { password: userPassword, ...userData } = user;

    const result = await comparePassword(password, userPassword);

    if (!result) {
      throw new BadRequestException({
        type: 'msg',
        message: 'credentials_are_incorrect',
      });
    }

    const tokens = await this.getTokens(run, user.role as RoleEnum);

    await this.usersRepo.update(run, { last_join: new Date() });
    await this.updateRefreshToken(run, tokens.refreshToken);

    return { tokens, userData };
  }

  async autoLogin(run: number) {
    const queryUser = await this.usersRepo.findOne(run);
    if (!queryUser) {
      throw new BadRequestException({ type: 'msg', message: 'user_not_found' });
    }
    const { password: _, ...user } = queryUser;

    const tokens = await this.getTokens(run, user.role as RoleEnum);

    await this.updateRefreshToken(run, tokens.refreshToken);

    return { tokens, user };
  }

  async logout(run: number) {
    return this.usersRepo.update(run, { refresh_token: null });
  }

  async updateRefreshToken(run: number, refreshToken: string) {
    const hashedRefreshToken = await hashPassword(refreshToken);
    await this.usersRepo.update(run, { refresh_token: hashedRefreshToken });
  }

  async getTokens(run: number, role: RoleEnum) {
    const {
      access_token_secret,
      access_token_expires_in,
      refresh_token_secret,
      refresh_token_expires_in,
    } = config();
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: run, role },
        { secret: access_token_secret, expiresIn: access_token_expires_in }
      ),
      this.jwtService.signAsync(
        { sub: run, role },
        { secret: refresh_token_secret, expiresIn: refresh_token_expires_in }
      ),
    ]);

    return { accessToken, refreshToken };
  }

  validateToken(token: string) {
    try {
      this.jwtService.verify(token, {
        secret: config().access_token_secret,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async refreshTokens(run: number, refreshToken: string) {
    const user = await this.usersRepo.findOneWithRefreshToken(run);

    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await comparePassword(
      refreshToken,
      user.refresh_token
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(run, user.role as RoleEnum);

    // await this.updateRefreshToken(run, tokens.refreshToken);
    return tokens;
  }

  async changePassword(run: number, oldPassword: string, newPassword: string) {
    const user = await this.usersRepo.findOne(run);
    if (!user) {
      throw new BadRequestException({ type: 'msg', message: 'user_not_found' });
    }
    const { password: userPassword } = user;
    const result = await comparePassword(oldPassword, userPassword);
    if (!result) {
      throw new BadRequestException({
        type: 'msg',
        message: 'credentials_are_incorrect',
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await this.usersRepo.update(run, { password: hashedPassword });

    return { msg: 'password_change_successful' }
  }

  async resetUserPassword(runOuter: number) {
    const user = await this.usersRepo.findOne(runOuter);
    if (!user) {
      throw new BadRequestException({ type: 'msg', message: 'User not found' });
    }
    const { run, first_surname } = user;
    const hashedPassword = await hashPassword(
      `${run}_${first_surname.toUpperCase()}`
    );
    await this.usersRepo.update(run, { password: hashedPassword });

    return { msg: 'password_reset_successful'}
  }
  // getUserFromRefreshToken(token: string) {
  //   try {
  //     const { sub, role } = this.jwtService.verify(token, {
  //       secret: config().refresh_token_secret,
  //     });
  //     return { run: sub, role };
  //   } catch (error) {
  //     throw new BadRequestException({ type: 'msg', message: 'Invalid token' });
  //   }
  // }
}
