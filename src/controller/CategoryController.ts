import { Request, Response } from 'express'

import generateResponseError from '../helpers/generateResponseError'

const db = require('../models')

class CategoryController {
  protected tempVariable: string = 'Init Class CategoryController'

  constructor() {
    //TODO : Pelajari penggunaan bind
    console.log(this.tempVariable)
    this.index = this.index.bind(this)
    this.create = this.create.bind(this)
  }

  tempFuncForTestUpdateVariable(msg: string) {
    console.log('----------------------')
    console.log('before :', this.tempVariable)
    this.tempVariable = msg
    console.log('after :', this.tempVariable)
    console.log('----------------------')
  }

  async index(req: Request, res: Response): Promise<Response> {
    this.tempFuncForTestUpdateVariable('last used is index function')

    try {
      const userId = res.locals.credential.id
      const categories = await db.Category.findAll({
        where: {
          user_id: userId
        }
      })

      return res.send(categories)
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to get categories, please try again'
      return generateResponseError({ res, message, status: 500 })
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const userId = res.locals.credential.id
      const categoryId = req.params.id

      const category = await db.Category.findOne({
        where: {
          id: categoryId,
          user_id: userId
        }
      })

      if (!category) {
        const message: string = 'Category not found'
        return generateResponseError({ res, message, status: 404 })
      }

      return res.send(category)
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to get category, please try again'
      return generateResponseError({ res, message, status: 500 })
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    this.tempFuncForTestUpdateVariable('last used is create function')

    try {
      const userId = res.locals.credential.id
      const { name } = req.body

      const createCategory = await db.Category.create({
        user_id: userId,
        name
      })

      return res.send({
        message: 'Successfully to create category'
      })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to create category, please try again'
      return generateResponseError({ res, message, status: 500 })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const userId = res.locals.credential.id
      const categoryId = req.params.id
      const { name } = req.body

      await db.Category.update(
        {
          name
        },
        {
          where: {
            id: categoryId,
            user_id: userId
          }
        }
      )

      return res.send({
        message: 'Successfully to update category'
      })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to update category, please try again'
      return generateResponseError({ res, message, status: 500 })
    }
  }

  delete(req: Request, res: Response) {
    res.send('TODO : delete')
  }
}

export default CategoryController
