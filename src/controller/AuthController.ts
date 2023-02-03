import { Request, Response } from 'express'
import { Op } from 'sequelize'

import generateResponseError from '../helpers/generateResponseError'
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

        return generateResponseError({ res, errors })
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

          return generateResponseError({ res, errors })
        }
      }

      const token = Auth.generateToken(
        user.id,
        user.username,
        user.email,
        user.password
      )

      return res.status(200).send({ token })
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to login, please try again'
      return generateResponseError({ res, message, status: 500 })
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

      return res.send(createUser)
    } catch (e) {
      console.log(e)
      const message: string = 'Failed to register, please try again'
      return generateResponseError({ res, message, status: 500 })
    }
  }
}

export default new AuthController()
