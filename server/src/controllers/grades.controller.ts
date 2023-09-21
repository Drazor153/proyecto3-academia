import type { Request, Response } from 'express';
import { prisma } from '../services/db';

export const getStudentGrades = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { run } = req.params;

  const studentGrades = await prisma.student.findUnique({
    where: {
      run: Number(run)
    },
    include: {
      levels: true,
      Results: true
    }
  });

  res.json({ data: studentGrades });
};
