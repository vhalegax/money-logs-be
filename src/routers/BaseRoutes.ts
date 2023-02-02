import { Router, Request, Response } from 'express'
import InterfaceRoute from './../interfaces/InterfaceRoute'

//* Abstract mean https://www.tutorialsteacher.com/typescript/abstract-class
abstract class BaseRoutes implements InterfaceRoute {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  abstract routes(): void
}

export default BaseRoutes
