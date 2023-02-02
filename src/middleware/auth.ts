import { Request, Response, NextFunction } from 'express'

const auth = (req: Request, res: Response, next: NextFunction): any => {
  const isAuth: Boolean = true

  if (isAuth) {
    console.log('TODO Middleware auth')
    next()
  }

  return res.status(404).send('Unauthorized')
}

export default auth
