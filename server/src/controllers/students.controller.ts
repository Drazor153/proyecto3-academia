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
  res.json({ data: students });
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
        firstLastname: first_surname,
        secondLastname: second_surname,
        levels: {
          create: [
            {
              status: 'Cursando',
              year: 2023,
              level: {
                connect: {
                  id: level
                }
              }
            }
          ]
        }
      }
    });
    res.status(201).json({ message: 'Usuario creado correctamente!', student });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMsg: 'Error!', errorObj: error });
  }
};

export const getStudentGrades = async (req: Request, res: Response) => {
  const { year, level, run } = req.params;

  const classGroupExams = await prisma.exam.findMany({
    where: {
      classgroup: {
        levelId: level,
        year: Number(year)
      }
    },
    include: {
      Results: {
        where: {
          studentId: Number(run)
        }
      }
    }
  });

  // console.log(classGroupExams);

  res.status(200).json({
    data: classGroupExams
  });
};
