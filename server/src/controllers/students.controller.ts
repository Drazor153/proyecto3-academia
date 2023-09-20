import type { Request, Response } from 'express';
import { prisma } from '../services/db';

type Student = {
  run: number;
  dv: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
};

export const ping = (_req: Request, res: Response): void => {
  res.send('pooooooong');
};

export const all = async (_req: Request, res: Response): Promise<void> => {
  const students = await prisma.student.findMany();

  res.json({ data: students });
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { run, dv, nombre, primerApellido, segundoApellido }: Student =
    req.body;

  const studenExist = await prisma.student.findUnique({ where: { run } });

  if (studenExist !== null) {
    res
      .status(400)
      .json({ message: 'El estudiante ya ha sido registrado con el rut dado' });
    return;
  }
  try {
    const student = await prisma.student.create({
      data: {
        run,
        dv,
        nombre,
        primerApellido,
        segundoApellido
      }
    });
    res.status(201).json({ message: 'Usuario creado correctamente!', student });
  } catch (error) {
    res.status(400).json({ message: 'Error!', error });
  }
};
