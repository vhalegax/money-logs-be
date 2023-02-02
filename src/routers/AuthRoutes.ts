import BaseRoutes from './BaseRoutes'
import AuthController from '../controller/AuthController'

import registerValidations from '../validators/auth/registerValidations'

class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/login', AuthController.login)
    this.router.post('/register', registerValidations, AuthController.register)
  }
}

export default new AuthRoutes().router
