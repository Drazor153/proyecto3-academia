import type { Request, Response } from 'express';
import { prisma } from '../services/db';

type Student = {
  run: number;
  dv: string;
  name: string;
  firstLastname: string;
  secondLastname: string;
  level: number;
};

export const ping = (_req: Request, res: Response): void => {
  res.send('pooooooong');
};

export const all = async (_req: Request, res: Response): Promise<void> => {
  const students = await prisma.student.findMany();

  res.json({ data: students });
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { run, dv, name, firstLastname, secondLastname, level }: Student =
    req.body;

  const studenExist = await prisma.student.findUnique({ where: { run } });

  if (studenExist !== null) {
    res
      .status(400)
      .json({ message: 'El estudiante ya ha sido registrado con el rut dado' });
    return;
  }
  try {
    const level_id = await prisma.level.findFirst({
      where: {
        level_number: level
      },
      select: {
        id: true
      }
    });

    const student = await prisma.student.create({
      data: {
        run,
        dv,
        name,
        firstLastname,
        secondLastname,
        levels: {
          create: [
            {
              status: 'Cursando',
              year: 2023,
              level: {
                connect: {
                  id: level_id?.id
                }
              },
            }
          ]
        }
      }
    });
    res.status(201).json({ message: 'Usuario creado correctamente!', student });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error!', error });
  }
};
