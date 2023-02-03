import { Response } from 'express'
import { groupBy } from 'lodash'

interface ResponseErrorMessage {
  [key: string]: Array<string>
}

interface ResponseObject {
  message: string
  errors?: ResponseErrorMessage
  result?: any
}

interface ErrorObject {
  param: string
  msg: string
  value?: any
  location?: string
}

interface ObjectParam {
  res: Response
  status?: number
  message?: string
  errors?: Array<ErrorObject>
  result?: any
}

const RESPONSE_CODE_SUCCESS = 200
const RESPONSE_CODE_BAD_REQUEST = 400

class ApiResponse {
  public static success = (param: ObjectParam): Response => {
    const {
      res,
      status = RESPONSE_CODE_SUCCESS,
      message = 'Success',
      result
    } = param

    const response: ResponseObject = {
      message
    }

    if (result) response.result = result

    return res.status(status).send(response)
  }

  public static error = (param: ObjectParam): Response => {
    const {
      res,
      status = RESPONSE_CODE_BAD_REQUEST,
      message = 'The given data was invalid.',
      errors = []
    } = param

    let resError = groupBy(errors, (error: any) => error.param)
    let resErrorMessages: ResponseErrorMessage = {}

    Object.keys(resError).forEach((key: string) => {
      resErrorMessages[key] = resError[key].map(({ msg }) => msg)
    })

    const response: ResponseObject = {
      message,
      errors: resErrorMessages
    }

    return res.status(status).send(response)
  }
}

export default ApiResponse
