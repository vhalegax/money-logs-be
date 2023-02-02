import { Request, Response, NextFunction } from 'express'
import { check, validationResult, CustomValidator } from 'express-validator'

import generateResBadReq from '../../helpers/generateResBadReq'

const db = require('../../models')

const usernameIsExist: CustomValidator = async (value) => {
  const user = await db.User.findOne({
    where: {
      username: value
    }
  })

  if (user) throw new Error('Username already in use')

  return true
}

const emailIsExist: CustomValidator = async (value) => {
  const user = await db.User.findOne({
    where: {
      email: value
    }
  })

  if (user) throw new Error('E-mail already in use')

  return true
}

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //* Manual Check
  await Promise.all([
    check('username').notEmpty().withMessage('Username is required').run(req),
    check('password').notEmpty().withMessage('Password is required').run(req),
    check('email').notEmpty().withMessage('E-mail is required').run(req),
    check('email').isEmail().withMessage('E-mail format is invalid').run(req)
  ])

  let errors = validationResult(req)

  //* Run custom check, after manual check success without error
  if (errors.isEmpty()) {
    await Promise.all([
      check('username').custom(usernameIsExist).run(req),
      check('email').custom(emailIsExist).run(req)
    ])

    errors = validationResult(req)
  }

  if (!errors.isEmpty()) {
    const response = generateResBadReq(errors.array())
    return res.status(400).send(response)
  }

  next()
}
