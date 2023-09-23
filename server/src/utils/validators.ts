import { body } from 'express-validator';

export const studentRegisterValidator = [
  body('run').notEmpty(),
  body('dv').notEmpty().isInt(),
  body('name').notEmpty(),
  body('first_surname').notEmpty(),
  body('second_surname').notEmpty(),
  body('level').notEmpty()
];
