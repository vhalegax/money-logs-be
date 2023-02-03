import { Request, Response, NextFunction } from 'express'
import { check, validationResult, CustomValidator } from 'express-validator'

import generateResponseError from '../../helpers/generateResponseError'

const db = require('../../models')

const nameIsExist: CustomValidator = async (value, { req }) => {
  const userId = req.res.locals.credential.id
  const user = await db.Category.findOne({
    where: {
      name: value,
      user_id: userId
    }
  })

  if (user) throw new Error('Name already in use')

  return true
}

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  //* Manual Check
  await Promise.all([
    check('name').notEmpty().withMessage('Name is required').run(req)
  ])

  let errors = validationResult(req)

  //* Run custom check, after manual check success without error
  if (errors.isEmpty()) {
    await Promise.all([check('name').custom(nameIsExist).run(req)])
    errors = validationResult(req)
  }

  if (!errors.isEmpty()) {
    return generateResponseError({ res, errors: errors.array() })
  }

  return next()
}
