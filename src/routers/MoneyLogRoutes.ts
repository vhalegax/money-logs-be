import BaseRoutes from './BaseRoutes'
import MoneyLogController from '../controller/MoneyLogController'
import MoneyLogValidator from '../validators/MoneyLogValidator'

class MoneyLogRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', MoneyLogController.index)
    this.router.get('/:id', MoneyLogController.show)
    this.router.post('/', MoneyLogValidator.create, MoneyLogController.create)
    this.router.put('/:id', MoneyLogValidator.update, MoneyLogController.update)
    this.router.delete('/', MoneyLogController.delete)
  }
}

export default new MoneyLogRoutes().router
