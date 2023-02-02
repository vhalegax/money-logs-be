import { Router, Request, Response } from 'express'
import IntRouter from './../interfaces/IntRoute'

import UserController from '../controller/UserController'

class UserRoutes implements IntRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.routes()
  }

  public routes(): void {
    this.router.get('/', UserController.index)
    this.router.get('/:id', UserController.detail)
    this.router.post('/', UserController.create)
    this.router.put('/', UserController.update)
    this.router.delete('/', UserController.delete)
  }
}

export default new UserRoutes().router
