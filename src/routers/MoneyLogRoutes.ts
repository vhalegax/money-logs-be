import BaseRoutes from './BaseRoutes'
import MoneyLogController from '../controller/MoneyLogController'

class MoneyLogRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', MoneyLogController.index)
    this.router.get('/:id', MoneyLogController.detail)
    this.router.post('/', MoneyLogController.create)
    this.router.put('/', MoneyLogController.update)
    this.router.delete('/', MoneyLogController.delete)
  }
}

export default new MoneyLogRoutes().router
