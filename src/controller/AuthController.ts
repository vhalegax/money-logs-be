import { Request, Response } from 'express'
import { Op } from 'sequelize'

import ApiResponse from '../helpers/ApiResponse'
import Auth from '../helpers/Auth'

const db = require('../models')

class AuthController {
  async login(req: Request, res: Response): Promise<Response> {
    const { usernameOrEmail, password } = req.body

    try {
      const user = await db.User.findOne({
        where: {
          [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        }
      })

      if (!user) {
        const errors = [
          {
            param: 'usernameOrEmail',
            msg: 'Username or email is invalid.'
          }
        ]

        return ApiResponse.error({ res, errors })
      }

      if (user) {
        let isValidBcryptPass: boolean = await Auth.isValidBcryptPass(
          password,
          user.password
        )

        if (!isValidBcryptPass) {
          const errors = [
            {
              param: 'usernameOrEmail',
              msg: 'Password is invalid.'
            }
          ]

          return ApiResponse.error({ res, errors })
        }
      }

      const token = Auth.generateToken(
        user.id,
        user.username,
        user.email,
        user.password
      )

      return ApiResponse.success({ res, result: { token } })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to login, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    let { username, email, password } = req.body

    const hashedPassword: string = await Auth.hash(password)

    try {
      const createUser = await db.User.create(
        {
          username,
          email,
          password: hashedPassword
        },
        {
          logging: false
        }
      )

      return ApiResponse.success({ res, message: 'Successfully to create user' })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to register, please try again'
      return ApiResponse.error({ res, message, status: 500 })
    }
  }
}

export default new AuthController()
