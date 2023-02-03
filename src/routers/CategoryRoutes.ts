import BaseRoutes from './BaseRoutes'
import CategoryController from '../controller/CategoryController'
import CategoryValidator from '../validators/CategoryValidator'

class CategoryRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', CategoryController.index)
    this.router.get('/:id', CategoryController.show)
    this.router.post('/', CategoryValidator.create, CategoryController.create)
    this.router.put('/:id', CategoryValidator.update, CategoryController.update)
    this.router.delete('/:id', CategoryController.delete)
  }
}

export default new CategoryRoutes().router
