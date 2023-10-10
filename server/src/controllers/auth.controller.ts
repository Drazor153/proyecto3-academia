import { RequestHandler } from 'express';
import { prisma } from '../services/db';
import { LoginForm } from '../types/auth';
import { sign } from 'jsonwebtoken';
import { access_token_secret } from '../services/config';
import { comparePassword } from '../services/bcrypt';

export const login: RequestHandler = async (req, res) => {
  const { run, password }: LoginForm = req.body;

  const user = await prisma.user.findUnique({
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
    res.status(404).json({ type: 'msg', message: 'User not found' });
    return;
  }

  const { password: userPassword, ...userData } = user;

  if (userData.status === 'DISABLED') {
    res.status(403).json({ type: 'msg', message: 'User is disabled' });
    return;
  }

  const result = await comparePassword(password, userPassword);

  if (!result) {
    res.status(401).json({ type: 'msg', message: 'Credentials are incorrect' });
    return;
  }

  const token = sign(userData, access_token_secret, {
    expiresIn: '1h',
  });

  res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'strict', secure: true });
  res.json({ userData });
};

export const logout: RequestHandler = (_req, res): void => {
  res.clearCookie('token').json({ type: 'msg', message: 'Logout successful' });
};
