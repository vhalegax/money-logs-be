import { Request, Response, NextFunction } from 'express'
import { check, validationResult, CustomValidator } from 'express-validator'
import { Op } from 'sequelize'

import BaseValidator from './BaseValidator'

const db = require('../models')

const isNameExist: CustomValidator = async (value, { req }) => {
  const categoryId = req.params?.id
  const userId = req.res.locals.credential.id

  const where = {
    name: value,
    user_id: userId
  }

  if (categoryId) {
    Object.assign(where, { id: { [Op.not]: categoryId } })
  }

  const category = await db.Category.findOne({
    where
  })

  if (category) throw new Error('Name already in use')

  return true
}

const isCategoryIdExist: CustomValidator = async (value, { req }) => {
  const categoryId = req.params?.id
  const userId = req.res.locals.credential.id

  const category = await db.Category.findOne({
    where: {
      id: categoryId,
      user_id: userId
    }
  })

  if (!category)
    throw new Error(`Category id not found or don't belong to this user`)

  return true
}

class CategoryValidator extends BaseValidator {
  private baseRules = [check('name').notEmpty().withMessage('Name is required')]

  create = async (req: Request, res: Response, next: NextFunction) => {
    const rules = this.baseRules
    const customRules = [check('name').custom(isNameExist)]

    const param = { req, res, next, rules, customRules }
    return await this.runValidator(param)
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const rules = this.baseRules
    const preCheckRules = [check(['id']).custom(isCategoryIdExist)]
    const customRules = [check(['name']).custom(isNameExist)]

    const param = { req, res, next, rules, customRules, preCheckRules }
    return await this.runValidator(param)
  }
}

export default new CategoryValidator()
