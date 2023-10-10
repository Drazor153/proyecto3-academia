import type { Request, Response } from 'express';
import { prisma } from '../services/db';
import { LoginForm } from '../types/auth';
import { sign } from 'jsonwebtoken';

export const login = async (req: Request, res: Response): Promise<void> => {
  const {run, dv}: LoginForm = req.body;

  if(typeof dv !== 'string') {
    res.status(400).json({type: 'msg', message: 'Dv type must be string' });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      run, dv
    },
    select: {
      run: true,
      dv: true,
      name: true,
      first_surname: true,
      email: true,
      role: true,
      status: true
    }
  })

  if (!user) {
    res.status(404).json({type: 'msg', message: 'User not found' });
    return;
  }

  const accessToken = sign(user, process.env.ACCESS_TOKEN_SECRET!)

  res.json({user, accessToken})
};
