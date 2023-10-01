import { body } from 'express-validator';

export const studentRegisterValidator = [
  body('run').notEmpty().isInt(),
  body('dv').notEmpty(),
  body('name').notEmpty(),
  body('first_surname').notEmpty(),
  body('second_surname').notEmpty(),
  body('level').notEmpty()
];

export const postGradeValidator = [
  body('run').notEmpty().isInt(),
  body('quizId').notEmpty().isInt(),
  body('grade').notEmpty().isFloat()
];