import express, { Application, Express, Request, Response } from 'express'

import dotenv from 'dotenv'
import morgan from 'morgan' //* Lib for logging
import helmet from 'helmet' //* Lib for Security
import cors from 'cors' //* Lib for CORS
import compression from 'compression'

//* Routes

import CategoryRoutes from './routers/CategoryRoutes'
import MoneyLogRoutes from './routers/MoneyLogRoutes'
import UserLogRoutes from './routers/UserRoutes'

//* middleware
import authMiddleware from './middleware/auth'

//* Main

dotenv.config()

const PORT: number = 3000

//* Function App

// const app: Express = express();

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server edit");
// });

// app.listen(port, () => {
//   console.log(alex);
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

//* End

//* Class Base App / OOP

class App {
  public app: Application

  constructor() {
    this.app = express()
    this.plugins()
    this.routes()
  }

  protected plugins(): void {
    // for parsing application/json
    this.app.use(express.json())

    // for parsing application/xwww-
    // this.app.use(express.urlencoded());

    // for parsing application//form-data
    // this.app.use(express.static("public"));

    this.app.use(morgan('dev'))
    this.app.use(compression())
    this.app.use(helmet())
    this.app.use(cors())
  }

  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.send('Hello World')
    })

    this.app.use('/categories', CategoryRoutes)
    this.app.use('/money-logs', MoneyLogRoutes)
    this.app.use('/users', UserLogRoutes)
  }
}

const app = new App().app
app.listen(PORT, (): void => {
  console.log(`Server is running at port : ${PORT}`)
})
