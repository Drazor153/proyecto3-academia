import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { comparePassword } from 'src/services/bcrypt';

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

    const token = await this.jwtService.signAsync(userData);

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   sameSite: 'none',
    //   maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    //   secure: true,
    // });
    return { token, userData };
  }
}
