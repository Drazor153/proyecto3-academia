import type { Request, Response } from 'express';
import { prisma } from '../services/db';

export const all = async (_req: Request, res: Response): Promise<void> => {
  const query = await prisma.level.findMany();

  const levels = query.map((val) => ({
    levelName: val.name,
    levelCode: val.code
  }))

  res.json({ data: levels });
};
