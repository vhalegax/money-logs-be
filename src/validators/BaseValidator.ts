import { Request, Response, NextFunction } from 'express'
import { validationResult, Result, ValidationChain } from 'express-validator'

import ApiResponse from '../helpers/ApiResponse'

interface BaseValidatorParam {
  req: Request
  res: Response
  next: NextFunction
  rules: Array<ValidationChain>
  customRules?: Array<ValidationChain>
  preCheckRules?: Array<ValidationChain>
}

class BaseValidator {
  runValidator = async (param: BaseValidatorParam) => {
    let errors
    const { req, res, next, rules, customRules, preCheckRules } = param

    //* Pre check rules
    if (preCheckRules) {
      await Promise.all(preCheckRules.map((rule) => rule.run(req)))
      errors = validationResult(req)

      if (errors.isEmpty() == false) {
        return ApiResponse.error({ res, errors: errors.array() })
      }
    }

    //* Manual Rules Check
    await Promise.all(rules.map((rule) => rule.run(req)))
    errors = validationResult(req)

    if (errors.isEmpty() == false) {
      return ApiResponse.error({ res, errors: errors.array() })
    }

    //* Run custom check, after manual check success without error
    if (customRules) {
      await Promise.all(customRules.map((rule) => rule.run(req)))
      errors = validationResult(req)
    }

    if (errors.isEmpty() == false) {
      return ApiResponse.error({ res, errors: errors.array() })
    }

    return next()
  }
}

export default BaseValidator
