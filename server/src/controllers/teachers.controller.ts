import type { Request, Response } from 'express';
import { prisma } from '../services/db';
import { validationResult } from 'express-validator';

export const getTeacherLevels = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { run } = req.params;
  const teacher = await prisma.teaches.findMany({
    where: { teacherRun: Number(run) },
    include: { level: true }
  });

  const teacherLevels = teacher.map((val) => ({
    semester: val.semester,
    year: val.year,
    levelName: val.level.name,
    levelCode: val.levelCode
  }));

  res.status(200).json({ data: teacherLevels });
};

export const postGrade = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json({ errorType: 'invalidFields', errorMsg: errors.array() });
    return;
  }
  const { run, quizId, grade } = req.body;

  const newGrade = await prisma.gives.create({
    data: {
      studentRun: run,
      quizId: quizId,
      grade: grade
    }
  });

  res.status(201).json({ data: newGrade });
};
