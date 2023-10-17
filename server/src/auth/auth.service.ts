import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword } from 'src/services/bcrypt';
import { RoleEnum } from './roles.decorator';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
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
      throw new HttpException(
        { type: 'msg', message: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { password: userPassword, ...userData } = user;

    const result = await comparePassword(password, userPassword);

    if (!result) {
      throw new HttpException(
        { type: 'msg', message: 'Credentials are incorrect' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.jwtService.signAsync({
      run: userData.run,
      role: userData.role,
    });

    return { token, userData };
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
      throw new HttpException(
        { type: 'msg', message: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.jwtService.signAsync({
      run: user.run,
      role: user.role,
    });

    return { token, user };
  }
}
