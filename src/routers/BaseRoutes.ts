import { Router, Request, Response } from 'express'
import InterfaceRoute from '../interfaces/InterfaceRoute'

abstract class BaseRoutes implements InterfaceRoute {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  //* Abstract mean https://www.tutorialsteacher.com/typescript/abstract-class
  abstract routes(): void
}

export default BaseRoutes
