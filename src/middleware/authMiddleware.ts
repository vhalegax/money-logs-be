import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const SECRET_KEY: string = process.env.SECRET_KEY || 'secret'

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.headers.authorization) {
    return res.status(401).send('Not authenticated')
  }

  try {
    const token: string = req.headers.authorization.split(' ')[1]
    const credential: string | object = jwt.verify(token, SECRET_KEY)

    if (!credential) {
      return res.status(401).send('Unauthorized')
    }

    next()
  } catch (err) {
    return res.status(401).send(err)
  }
}

export default authMiddleware
