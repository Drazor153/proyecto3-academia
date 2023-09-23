import type { Request, Response } from 'express';
import { prisma } from '../services/db';

export const all = async (_req: Request, res: Response): Promise<void> => {
  const levels = await prisma.level.findMany();
  res.json({ data: levels });
};
