import type { Request, Response } from 'express';
import { prisma } from '../services/db';

export const getTeacherClassgroups = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { run } = req.params;

  const teacherClassgroups = await prisma.classGroup.findMany({
    where: {
      teacherId: Number(run)
    }
  });

  res.status(200).json({ data: teacherClassgroups });
};

export const getLevelClasses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { year, level, group } = req.params;

  const classesFound = await prisma.class.findMany({
    where: {
      classgroup: {
        levelId: level,
        groupId: group,
        year: Number(year)
      }
    }
  });

  res.status(200).json({
    data: classesFound
  });
};
