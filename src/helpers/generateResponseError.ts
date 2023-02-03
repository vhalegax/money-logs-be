import { Response } from 'express'

import { groupBy } from 'lodash'

interface ResponseErrorMessage {
  [key: string]: Array<string>
}

interface ResponseError {
  message: string
  errors: ResponseErrorMessage
}

interface ErrorObject {
  param: string
  msg: string
  value?: any
  location?: string
}

interface ObjectParam {
  res: Response
  status?: number | undefined
  message?: string | undefined
  errors?: Array<ErrorObject>
}

export default function (param: ObjectParam): Response {
  const {
    res,
    status = 400,
    errors = [],
    message = 'The given data was invalid.'
  } = param

  console.log(errors, message)

  let resError = groupBy(errors, (error: any) => error.param)
  let resErrorMessages: ResponseErrorMessage = {}

  Object.keys(resError).forEach((key: string) => {
    resErrorMessages[key] = resError[key].map(({ msg }) => msg)
  })

  const response: ResponseError = {
    message,
    errors: resErrorMessages
  }

  return res.status(status).send(response)
}
