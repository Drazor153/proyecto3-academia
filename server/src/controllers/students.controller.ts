import type { Request, Response } from 'express';
import { prisma } from '../services/db';
import { validationResult } from 'express-validator';

type Student = {
  run: number;
  dv: string;
  name: string;
  first_surname: string;
  second_surname: string;
  level: string;
};

export const get = async (_req: Request, res: Response): Promise<void> => {
  const students = await prisma.student.findMany();
  res.status(200).json({ data: students });
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    res
      .status(400)
      .json({ errorType: 'invalidFields', errorMsg: results.array() });
    return;
  }
  const { run, dv, name, first_surname, second_surname, level }: Student =
    req.body;

  if (typeof run !== 'number') {
    res.status(400).json({
      errorType: 'msg',
      errorMsg: 'Run type must be number'
    });
    return;
  }

  const studenExist = await prisma.student.findUnique({ where: { run } });

  if (studenExist !== null) {
    res.status(400).json({
      errorType: 'msg',
      errorMsg: 'Run already registered'
    });
    return;
  }
  try {
    const student = await prisma.student.create({
      data: {
        run,
        dv,
        name,
        first_surname,
        second_surname,
        enrols: {
          create: [
            {
              status: 'Cursando',
              year: new Date(Date.now()).getFullYear(),
              semester: 1,
              level: {
                connect: {
                  code: level
                }
              }
            }
          ]
        }
      },
      select: {
        run: true,
        name: true,
        first_surname: true
      }
    });
    res.status(201).json({ message: 'Usuario creado correctamente!', student });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: 'Error!', errorObj: error });
  }
};

export const getLevels = async (req: Request, res: Response) => {
  const { run } = req.params;

  const query = await prisma.enrols.findMany({
    where: {
      studentRun: +run
    },
    orderBy: {
      year: 'desc'
    },
    include: {
      level: true
    }
  });

  const studentLevels = query.map(val => ({
    semester: val.semester,
    year: val.year,
    levelName: val.level.name,
    status: val.status,
    levelCode: val.levelCode
  }))


  res.status(200).json({ data: studentLevels });
};

export const getStudentGrades = async (req: Request, res: Response) => {
  const { year, semester, level, run } = req.params;

  const topicQuizzesQuery = await prisma.quiz.findMany({
    where: {
      year: +year,
      semester: +semester,
      levelCode: level
    },
    include: {
      gives: {
        where: {
          studentRun: +run
        },
        select: {
          grade: true
        }
      },
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
      studentGrade: val.gives.length === 0 ? -1 : val.gives[0].grade
    };
  });

  res.status(200).json({
    data: topicQuizzesSanitizied
  });
};
