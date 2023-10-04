import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const formValidatorsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res
      .status(400)
      .json({ errorType: 'invalidFields', errorMsg: errors.array() });
    return;
  }
  next();
};

export const studentRegisterValidator = [
  body('run').notEmpty().isInt(),
  body('dv').notEmpty(),
  body('name').notEmpty(),
  body('first_surname').notEmpty(),
  body('second_surname').notEmpty(),
  body('level').notEmpty()
];

export const postGradeValidator = [
  body('quizId').notEmpty().isInt(),
  body('grades').notEmpty().isArray(),
  body('grades.*.run').notEmpty().isInt(),
  body('grades.*.grade').notEmpty().isFloat()
];

export const loginValidator = [
  body('run').notEmpty().isInt(),
  body('dv').notEmpty().isAlphanumeric()
];
