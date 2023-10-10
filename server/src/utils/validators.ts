import { body } from 'express-validator';

export const studentRegisterValidator = [
  body('run').notEmpty().isInt(),
  body('dv').notEmpty().isAlphanumeric(),
  body('name').notEmpty(),
  body('first_surname').notEmpty(),
  body('level').notEmpty(),
];

export const postGradeValidator = [
  body('quizId').notEmpty().isInt(),
  body('grades').notEmpty().isArray(),
  body('grades.*.run').notEmpty().isInt(),
  body('grades.*.grade').notEmpty().isFloat(),
];

export const postClassValidator = [
  body('lessonId').notEmpty().isInt(),
  body('week').notEmpty().isInt(),
  body('contents').notEmpty(),
  body('attendance').notEmpty().isArray(),
  body('attendance.*.studentRun').notEmpty().isInt(),
  body('attendance.*.attended').notEmpty().isBoolean(),
];

export const putClassValidator = [
  body('contents').notEmpty(),
  body('attendance').notEmpty().isArray(),
  body('attendance.*.studentRun').notEmpty().isInt(),
  body('attendance.*.attended').notEmpty().isBoolean(),
];

export const loginValidator = [
  body('run').notEmpty().isInt(),
  body('password').notEmpty().isString(),
];
