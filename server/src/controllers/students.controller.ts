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
    res.status(400).json({ errorMsg: results.array() });
    return;
  }
  const { run, dv, name, first_surname, second_surname, level }: Student =
    req.body;

  const studenExist = await prisma.student.findUnique({ where: { run } });

  if (studenExist !== null) {
    res
      .status(400)
      .json({
        errorMsg: 'El estudiante ya ha sido registrado con el rut dado'
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
  const { run } = req.params;

  const studentGrades = await prisma.student.findUnique({
    where: {
      run: Number(run)
    },
    include: {
      Results: true
    }
  });

  res.status(200).json({
    data: studentGrades
  });
};
