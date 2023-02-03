import { Request, Response } from 'express'

import BaseService from './BaseService'

const db = require('../models')

class CategoryService extends BaseService {
  constructor(req: Request, res: Response) {
    super({ req, res })
  }

  get = async () => {
    const userId = this.credential.id
    const { id } = this.params

    const moneyLog = await db.Category.findOne({
      where: {
        id,
        user_id: userId
      }
    })

    return moneyLog
  }

  getAll = async () => {
    const userId = this.credential.id
    const moneyLogs = await db.Category.findAll({
      where: {
        user_id: userId
      }
    })

    return moneyLogs
  }

  create = async () => {
    const userId = this.credential.id
    const { name } = this.body

    const moneyLog = await db.Category.create({
      user_id: userId,
      name
    })

    return moneyLog
  }

  update = async () => {
    const userId = this.credential.id
    const { name } = this.body
    const { id } = this.params

    await db.Category.update(
      {
        name
      },
      {
        where: {
          id,
          user_id: userId
        }
      }
    )
  }
}

export default CategoryService
