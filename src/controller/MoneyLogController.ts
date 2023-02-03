import { Request, Response } from 'express'

import ApiResponse from '../helpers/ApiResponse'
import MoneyLogService from '../services/MoneyLogService'

class MoneyLogController {
  constructor() {}

  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const moneyLogService: MoneyLogService = new MoneyLogService(req, res)
      const moneyLogs = await moneyLogService.getAll()

      return ApiResponse.success({ res, result: { data: moneyLogs } })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to get money logs, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }

  show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const moneyLogService: MoneyLogService = new MoneyLogService(req, res)
      const moneyLog = await moneyLogService.get()

      if (!moneyLog) {
        const message: string = 'Money log not found'
        return ApiResponse.error({ res, message, status: 404 })
      }

      return ApiResponse.success({ res, result: { data: moneyLog } })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to get money log, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const moneyLogService: MoneyLogService = new MoneyLogService(req, res)
      await moneyLogService.create()

      return ApiResponse.success({
        res,
        message: 'Successfully to create money log'
      })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to create money log, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const moneyLogService: MoneyLogService = new MoneyLogService(req, res)
      await moneyLogService.update()

      return ApiResponse.success({
        res,
        message: 'Successfully to update money log'
      })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to update money, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }

  delete = (req: Request, res: Response) => {
    res.send('TODO : delete')
  }
}

export default new MoneyLogController()
