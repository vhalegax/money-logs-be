import BaseRoutes from './BaseRoutes'
import UserController from '../controller/UserController'

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', UserController.index)
    this.router.get('/:id', UserController.detail)
    this.router.post('/', UserController.create)
    this.router.put('/', UserController.update)
    this.router.delete('/', UserController.delete)
  }
}

export default new UserRoutes().router
