import type { Request, Response } from 'express';
import { prisma } from '../services/db';
import {
  sanitizeStudentGrades,
  sanitizeStudentLevels
} from '../utils/student.utils';
import { hashPassword } from '../services/bcrypt';

type Student = {
  run: number;
  dv: string;
  name: string;
  first_surname: string;
  level: string;
};

export const get = async (_req: Request, res: Response): Promise<void> => {
  const students = await prisma.user.findMany();
  res.status(200).json({ data: students });
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { run, dv, name, first_surname, level }: Student = req.body;

  const studenExist = await prisma.user.findUnique({ where: { run } });

  if (studenExist !== null) {
    res.status(400).json({
      errorType: 'msg',
      errorMsg: 'Run already registered'
    });
    return;
  }
  try {
    const hashedPassword = await hashPassword(`${run}_${first_surname.toUpperCase()}`);
    const student = await prisma.user.create({
      data: {
        run,
        dv,
        name: name.toUpperCase(),
        first_surname: first_surname.toUpperCase(),
        role: 'STUDENT',
        status: 'ENABLED',
        password: hashedPassword,
        enrols: {
          create: {
            status: 'Cursando',
            year: new Date(Date.now()).getFullYear(),
            semester: 1,
            level: {
              connect: {
                code: level
              }
            }
          }
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
      level: {
        include: {
          teaches: true
        }
      }
    }
  });

  const studentLevels = sanitizeStudentLevels(query);

  res.status(200).json({ data: studentLevels });
};

export const getClasses = async (req: Request, res: Response) => {
  const { lessonId, run } = req.params;
  const query = await prisma.class.findMany({
    where: {
      lessonId: +lessonId
    },
    include: {
      attendance: {
        where: {
          studentRun: +run
        }
      },
      lesson: {
        include: {
          teacher: {
            select: {
              name: true,
               first_surname: true
            }
          }
        }
      }
    },
    orderBy: {
      week: 'desc'
    }
  });

  const classes = query.map((val) => ({
    id: val.id,
    week: val.week,
    contents: val.contents,
    teacher: {
      name: val.lesson.teacher?.name,
      first_surname: val.lesson.teacher?.first_surname
    },
    attendance: val.attendance[0]?.attended
  }));

  res.status(200).json({ data: classes });
};
export const getStudentGrades = async (req: Request, res: Response) => {
  const { year, semester, level, run } = req.params;

  const query = await prisma.quiz.findMany({
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

  const topicQuizzesSanitizied = sanitizeStudentGrades(query);

  res.status(200).json({
    data: topicQuizzesSanitizied
  });
};
