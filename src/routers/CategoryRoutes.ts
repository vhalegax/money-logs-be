import BaseRoutes from './BaseRoutes'
import CategoryController from '../controller/CategoryController'

class CategoryRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', CategoryController.index)
    this.router.get('/:id', CategoryController.detail)
    this.router.post('/', CategoryController.create)
    this.router.put('/', CategoryController.update)
    this.router.delete('/', CategoryController.delete)
  }
}

export default new CategoryRoutes().router
