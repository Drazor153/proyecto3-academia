import type { Request, Response } from 'express';
import { prisma } from '../services/db';
import * as jwt from 'jsonwebtoken'
import { LoginForm } from '../types/auth';

export const login = async (req: Request, res: Response): Promise<void> => {
  const {run, dv}: LoginForm = req.body;

  if(typeof dv !== 'string') {
    res.status(400).json({type: 'msg', message: 'Dv type must be string' });
    return;
  }

  const user = await prisma.student.findUnique({
    where: {
      run, dv
    }
  })

  if (!user) {
    res.status(404).json({type: 'msg', message: 'Student not found' });
    return;
  }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!)

  res.json({user, accessToken})
};
