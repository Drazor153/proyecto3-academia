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

export const getLevelQuizzes = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { year, semester, level } = req.params;

  const topicQuizzesQuery = await prisma.quiz.findMany({
    where: {
      year: +year,
      semester: +semester,
      levelCode: level
    },
    include: {
      topic: true
    },
    orderBy: {
      id: 'asc'
    }
  });

  const topicQuizzesSanitizied = topicQuizzesQuery.map((val) => {
    return {
      topic: val.topic.name,
      quizNumber: val.number,
      quizId: val.id
    };
  });

  res.status(200).json({
    data: topicQuizzesSanitizied
  });
};

export const getQuizGrades = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { quizId } = req.params;

  const quiz = await prisma.quiz.findUnique({
    where: { id: +quizId }
  });

  if (!quiz) {
    res.status(404).json({errorType: 'msg', errorMsg: 'Quiz not found' });
    return;
  }

  const query = await prisma.student.findMany({
    where: {
      enrols: {
        some: {
          levelCode: quiz.levelCode,
          year: quiz.year,
          semester: quiz.semester,
          status: 'Cursando'
        }
      }
    },
    include: {
      gives: {
        where: {
          quizId: +quizId
        }
      }
    }
  });

  const gradesData = query.map(val => {
    const grade = val.gives[0]?.grade;
    return {
      run: val.run,
      name: val.name,
      first_surname: val.first_surname,
      grade: grade ? grade : 0,
      dv: val.dv
    }
  })

  res.status(200).json({ data: gradesData });
};

export const postQuizzesGrades = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
};
