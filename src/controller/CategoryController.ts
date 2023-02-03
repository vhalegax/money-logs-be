import { Request, Response } from 'express'

import generateResBadReq from '../helpers/generateResBadReq'

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
      return res.status(500).send({
        message: 'Failed to get categories, please try again'
      })
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
        const response = generateResBadReq([], 'Category not found')
        return res.status(404).send(response)
      }

      return res.send(category)
    } catch (e) {
      console.log(e)
      return res.status(500).send({
        message: 'Failed to get category, please try again'
      })
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
      return res.status(500).send({
        message: 'Failed to create category, please try again'
      })
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
      return res.status(500).send({
        message: 'Failed to update category, please try again'
      })
    }
  }

  delete(req: Request, res: Response) {
    res.send('TODO : delete')
  }
}

export default CategoryController
