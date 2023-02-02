import { Request, Response } from 'express'

import PasswordBcrypt from '../helpers/PasswordBcrypt'

const db = require('../models')

class AuthController {
  login(req: Request, res: Response) {
    res.send('login')
  }

  async register(req: Request, res: Response): Promise<Response> {
    let { username, email, password } = req.body

    const hashedPassword: string = await PasswordBcrypt.hash(password)

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
