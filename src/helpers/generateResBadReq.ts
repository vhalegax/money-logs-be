import { groupBy } from 'lodash'

interface Error {
  param: string
  msg: string
  value?: any
  location?: string
}

interface ErrorObject {
  [key: string]: Array<string>
}

interface ResponseBadRequest {
  message: string
  errors: ErrorObject
}

export default function (
  errors: Array<Error>,
  message: string = 'The given data was invalid.'
): ResponseBadRequest {
  let errorByParam = groupBy(errors, (error: any) => error.param)
  let errorMessages: ErrorObject = {}

  Object.keys(errorByParam).forEach((key: string) => {
    errorMessages[key] = errorByParam[key].map(({ msg }) => msg)
  })

  const responses: ResponseBadRequest = {
    message,
    errors: errorMessages
  }

  return responses
}
