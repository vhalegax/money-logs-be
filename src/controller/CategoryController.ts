import { Request, Response } from 'express'

import ApiResponse from '../helpers/ApiResponse'
import CategoryService from '../services/CategoryService'

class CategoryController {
  async index(req: Request, res: Response): Promise<Response> {
    try {
      const categoryService: CategoryService = new CategoryService(req, res)
      const categories = await categoryService.getAll()

      return ApiResponse.success({ res, result: { data: categories } })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to get categories, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const categoryService: CategoryService = new CategoryService(req, res)
      const category = await categoryService.get()

      if (!category) {
        const message: string = 'Category not found'
        return ApiResponse.error({ res, message, status: 404 })
      }

      return ApiResponse.success({ res, result: { data: category } })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to get category, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const categoryService: CategoryService = new CategoryService(req, res)
      await categoryService.create()

      return ApiResponse.success({
        res,
        message: 'Successfully to create category'
      })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to create category, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const categoryService: CategoryService = new CategoryService(req, res)
      await categoryService.update()

      return ApiResponse.success({
        res,
        message: 'Successfully to update category'
      })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to update category, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }

  delete(req: Request, res: Response) {
    res.send('TODO : delete')
  }
}

export default new CategoryController
