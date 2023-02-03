import { Request, Response } from 'express'

import BaseService from './BaseService'

const db = require('../models')

class MoneyLogService extends BaseService {
  constructor(req: Request, res: Response) {
    super({ req, res })
  }

  get = async () => {
    const userId = this.credential.id
    const { id } = this.params

    const moneyLog = await db.MoneyLog.findOne({
      where: {
        id,
        user_id: userId
      }
    })

    return moneyLog
  }

  getAll = async () => {
    const userId = this.credential.id
    const moneyLogs = await db.MoneyLog.findAll({
      where: {
        user_id: userId
      }
    })

    return moneyLogs
  }

  create = async () => {
    const userId = this.credential.id
    const { type, date, description, total, category_id } = this.body

    const moneyLog = await db.MoneyLog.create({
      user_id: userId,
      type,
      date,
      description,
      total,
      category_id
    })

    return moneyLog
  }

  update = async () => {
    const userId = this.credential.id
    const { type, date, description, total, category_id } = this.body
    const { id } = this.params

    await db.MoneyLog.update(
      {
        user_id: userId,
        type,
        date,
        description,
        total,
        category_id
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

export default MoneyLogService
