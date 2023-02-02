import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'

import generateResBadReq from '../../helpers/generateResBadReq'

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
    const response = generateResBadReq(errors.array())
    return res.status(400).send(response)
  }

  next()
}
