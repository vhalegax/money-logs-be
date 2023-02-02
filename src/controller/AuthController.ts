import { Request, Response } from 'express'
import { Op } from 'sequelize'

import generateResBadReq from '../helpers/generateResBadReq'
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

        const response = generateResBadReq(errors)
        return res.status(400).send(response)
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

          const response = generateResBadReq(errors)
          return res.status(400).send(response)
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
      return res.status(500).send('Failed to login, please try again')
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
      return res.status(500).send('Failed to create user, please try again')
    }
  }
}

export default new AuthController()
