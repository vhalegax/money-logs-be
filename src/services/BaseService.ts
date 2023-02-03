import { Request, Response } from 'express'

interface InterfaceBaseService {
  req: Request
  res: Response
}

abstract class BaseService {
  public credential: {
    id: number
  }

  public params: Request['params']
  public body: Request['body']

  constructor(param: InterfaceBaseService) {
    const { req, res } = param

    this.credential = res.locals.credential
    this.params = req.params
    this.body = req.body
  }
}

export default BaseService
