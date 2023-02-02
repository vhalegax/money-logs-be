import { Request, Response, NextFunction } from 'express'
import { check, validationResult, CustomValidator } from 'express-validator'

import generateResBadReq from '../../helpers/generateResBadReq'

const db = require('../../models')

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
    return res.status(422).send(response)
  }

  next()
}
