import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

import generateResponseError from '../../helpers/generateResponseError'

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //* Manual Check
  await Promise.all([
    check('password').notEmpty().withMessage('Password is required').run(req),
    check('usernameOrEmail')
      .notEmpty()
      .withMessage('Username Or Email is required')
      .run(req)
  ])

  let errors = validationResult(req)

  if (!errors.isEmpty()) {
    return generateResponseError({ res, errors: errors.array() })
  }

  return next()
}
