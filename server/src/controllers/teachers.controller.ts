import type { Request, Response } from 'express';
import { prisma } from '../services/db';
import { validationResult } from 'express-validator';
import { sanitizeTopicQuizzes, transformarDatos } from '../utils/teacher.utils';
import { QuizPost } from '../types/teachers';

export const getTeacherLessons = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { run } = req.params;
  const query = await prisma.lesson.findMany({
    where: { teacherRun: Number(run) },
    include: { level: true }
  });

  const teacherLevels = transformarDatos(query);

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

  const topicQuizzesSanitizied = sanitizeTopicQuizzes(topicQuizzesQuery);

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
    res.status(404).json({ errorType: 'msg', errorMsg: 'Quiz not found' });
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
    },
    orderBy: {
      first_surname: 'asc'
    }
  });

  const gradesData = query.map((val) => {
    const grade = val.gives[0]?.grade;
    return {
      run: val.run,
      name: val.name,
      first_surname: val.first_surname,
      grade: grade ? grade : 0,
      dv: val.dv
    };
  });

  res.status(200).json({ data: gradesData });
};

export const postQuizzesGrades = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { quizId, grades }: QuizPost = req.body;

  grades.forEach(async (val) => {
    await prisma.gives.upsert({
      where: {
        quizId_studentRun: {
          quizId: quizId,
          studentRun: val.run
        }
      },
      update: {
        grade: val.grade
      },
      create: {
        quizId: quizId,
        studentRun: val.run,
        grade: val.grade
      }
    });
  });

  console.log(`${grades.length} notas actualizadas`);

  res.status(200).json({ msg: 'Notas actualizadas!' });
};
export const getClasses = async (req: Request, res: Response) => {
  req;
  res;
};
export const createClass = async (req: Request, res: Response) => {
  req;
  res;
};
