import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';

export const formValidatorsMiddleware: RequestHandler = (req, res, next) => {
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
