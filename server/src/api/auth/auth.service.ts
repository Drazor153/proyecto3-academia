import {
  BadRequestException,
  ForbiddenException,
  // ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { RoleEnum } from '../../guards/roles.decorator';
import { BcryptService } from 'src/services/bcrypt.service';
import { config } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private bcrypt: BcryptService,
  ) {}

  async login(run: number, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        run: true,
        dv: true,
        name: true,
        first_surname: true,
        email: true,
        role: true,
        status: true,
        password: true,
      },
    });

    if (!user) {
      throw new BadRequestException({ type: 'msg', message: 'User not found' });
    }

    const { password: userPassword, ...userData } = user;

    const result = await this.bcrypt.comparePassword(password, userPassword);

    if (!result) {
      throw new BadRequestException({
        type: 'msg',
        message: 'Credentials are incorrect',
      });
    }

    const tokens = await this.getTokens(run, user.role as RoleEnum);

    this.prisma.user.update({
      where: {
        run,
      },
      data: {
        last_join: new Date(),
      },
    });
    this.updateRefreshToken(run, tokens.refreshToken);

    return { tokens, userData };
  }

  async autologin(run: number, role: RoleEnum) {
    const user = await this.prisma.user.findUnique({
      where: {
        run,
        role,
      },
      select: {
        run: true,
        dv: true,
        name: true,
        first_surname: true,
        email: true,
        role: true,
        status: true,
      },
    });
    if (!user) {
      throw new BadRequestException({ type: 'msg', message: 'User not found' });
    }
    const tokens = await this.getTokens(run, user.role as RoleEnum);

    await this.updateRefreshToken(run, tokens.refreshToken);

    return { tokens, user };
  }

  async logout(run: number) {
    return this.prisma.user.update({
      where: {
        run,
      },
      data: {
        refresh_token: null,
      },
    });
  }

  async updateRefreshToken(run: number, refreshToken: string) {
    const hashedRefreshToken = await this.bcrypt.hashPassword(refreshToken);
    await this.prisma.user.update({
      where: {
        run,
      },
      data: {
        refresh_token: hashedRefreshToken,
      },
    });
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
        {
          sub: run,
          role,
        },
        {
          secret: access_token_secret,
          expiresIn: access_token_expires_in,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: run,
          role,
        },
        {
          secret: refresh_token_secret,
          expiresIn: refresh_token_expires_in,
        },
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

  getUserFromRefreshToken(token: string) {
    try {
      const { sub, role } = this.jwtService.verify(token, {
        secret: config().refresh_token_secret,
      });
      return { run: sub, role };
    } catch (error) {
      throw new BadRequestException({ type: 'msg', message: 'Invalid token' });
    }
  }

  async refreshTokens(run: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        run,
      },
      select: {
        role: true,
        refresh_token: true,
      },
    });

    if (!user || !user.refresh_token) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await this.bcrypt.comparePassword(
      refreshToken,
      user.refresh_token,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(run, user.role as RoleEnum);

    // await this.updateRefreshToken(run, tokens.refreshToken);

    return tokens;
  }
}
