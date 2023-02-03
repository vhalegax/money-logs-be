import { Request, Response, NextFunction } from 'express'
import { check, validationResult, CustomValidator } from 'express-validator'

import ApiResponse from '../helpers/ApiResponse'

const db = require('../models')

const baseRules = (req: Request) => {
  return [
    check('type').notEmpty().withMessage('Type is required').run(req),
    check('date').notEmpty().withMessage('Date is required').run(req),
    check('description')
      .notEmpty()
      .withMessage('Description is required')
      .run(req),
    check('total').notEmpty().withMessage('Total is required').run(req),
    check('category_id').notEmpty().withMessage('Category is required').run(req)
  ]
}

const isMoneyLogExist: CustomValidator = async (value, { req }) => {
  const id = req.params?.id
  const userId = req.res.locals.credential.id

  const moneyLog = await db.MoneyLog.findOne({
    where: {
      id,
      user_id: userId
    }
  })

  if (!moneyLog)
    throw new Error(`Money Log not found or don't belong to this user`)

  return true
}

class MoneyLogValidator {
  public async create(req: Request, res: Response, next: NextFunction) {
    //* Manual Check
    await Promise.all([...baseRules(req)])

    let errors = validationResult(req)

    if (!errors.isEmpty()) {
      return ApiResponse.error({ res, errors: errors.array() })
    }

    return next()
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    //* Manual Check
    await Promise.all([...baseRules(req)])

    let errors = validationResult(req)

    //* Run custom check, after manual check success without error
    if (errors.isEmpty()) {
      await Promise.all([check('id').custom(isMoneyLogExist).run(req)])
      errors = validationResult(req)
    }

    if (!errors.isEmpty()) {
      return ApiResponse.error({ res, errors: errors.array() })
    }

    return next()
  }
}

export default new MoneyLogValidator()
