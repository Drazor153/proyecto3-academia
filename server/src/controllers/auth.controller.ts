import { RequestHandler } from 'express';
import { prisma } from '../services/db';
import { LoginForm} from '../types/auth';
import { sign } from 'jsonwebtoken';

export const login: RequestHandler = async (req, res): Promise<void> => {
  const { run, password }: LoginForm = req.body;

  const user = await prisma.user.findUnique({
    where: {
      run,
      password,
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
    res.status(404).json({ type: 'msg', message: 'Credentials are incorrect' });
    return;
  }

  const token = sign(user, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '1h',
  });
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
  res.json({ user });
};

export const logout: RequestHandler = (_req, res): void => {
  res.clearCookie('token').json({ type: 'msg', message: 'Logout successful' });
};
