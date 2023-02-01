import express, { Application, Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT: number = 3000;

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
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    // for parsing application/json
    this.app.use(express.json());

    // for parsing application/xwww-
    // this.app.use(express.urlencoded());

    // for parsing application//form-data
    // this.app.use(express.static("public"));
  }

  protected routes(): void {
    this.app.route("/").get((req: Request, res: Response) => {
      res.send("Hello World");
    });

    this.app.route("/categories").post((req: Request, res: Response) => {
      console.log("Routes : add category");
      console.log(req.body);
      res.send(req.body);
    });
  }
}

const app = new App().app;
app.listen(PORT, (): void => {
  console.log(`Server is running at port : ${PORT}`);
});
