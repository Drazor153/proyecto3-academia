import { body, validationResult } from 'express-validator';
import type { Request, Response, NextFunction } from 'express';

export const formValidatorsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    res
      .status(400)
      .json({ errorType: 'invalidFields', errorMsg: errors.array() });
    return;
  }
  next();
};

export const studentRegisterValidator = [
  body('run').notEmpty().isInt(),
  body('dv').notEmpty().isAlphanumeric(),
  body('name').notEmpty(),
  body('first_surname').notEmpty(),
  body('level').notEmpty()
];

export const postGradeValidator = [
  body('quizId').notEmpty().isInt(),
  body('grades').notEmpty().isArray(),
  body('grades.*.run').notEmpty().isInt(),
  body('grades.*.grade').notEmpty().isFloat()
];

export const postClassValidator = [
  body('lessonId').notEmpty().isInt(),
  body('week').notEmpty().isInt(),
  body('contents').notEmpty(),
  body('attendance').notEmpty().isArray(),
  body('attendance.*.studentRun').notEmpty().isInt(),
  body('attendance.*.attended').notEmpty().isBoolean()
]

export const loginValidator = [
  body('run').notEmpty().isInt(),
  body('dv').notEmpty().isAlphanumeric()
];
