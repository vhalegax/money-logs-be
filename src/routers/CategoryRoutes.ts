import BaseRoutes from './BaseRoutes'
import CategoryControllerClass from '../controller/CategoryController'

import createValidator from '../validators/categories/createValidator'
import updateValidator from '../validators/categories/updateValidator'

class CategoryRoutes extends BaseRoutes {
  public routes(): void {
    console.log('Init Class CategoryRoutes->routes')

    const CategoryController = new CategoryControllerClass()

    this.router.get('/', CategoryController.index)
    this.router.get('/:id', CategoryController.show)
    this.router.post('/', createValidator, CategoryController.create)
    this.router.put('/:id', updateValidator, CategoryController.update)
    this.router.delete('/:id', CategoryController.delete)
  }
}

export default CategoryRoutes
