import { Request, Response, NextFunction } from 'express'
import { check, validationResult, CustomValidator } from 'express-validator'
import { Op } from 'sequelize'

import ApiResponse from '../../helpers/ApiResponse'

const db = require('../../models')

const categoryCheck: CustomValidator = async (value, { req }) => {
  const categoryId = req.params?.id
  const userId = req.res.locals.credential.id

  const category = await db.Category.findOne({
    where: {
      id: categoryId
    }
  })

  if (!category) throw new Error('Category id not found')

  const categoryNameIsExist = await db.Category.findOne({
    where: {
      [Op.not]: {
        id: categoryId
      },
      name: value,
      user_id: userId
    }
  })

  if (categoryNameIsExist) throw new Error('Category name already used')

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
    await Promise.all([check('name').custom(categoryCheck).run(req)])
    errors = validationResult(req)
  }

  if (!errors.isEmpty()) {
    return ApiResponse.error({ res, errors: errors.array() })
  }

  return next()
}
