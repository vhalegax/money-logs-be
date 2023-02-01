import { Router, Request, Response } from "express";
import IntRouter from "./../interfaces/IntRoute";

class MoneyLogRoutes implements IntRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("index money logs");
    });

    this.router.get("/:id", (req, res) => {
      res.send("detail money log");
    });

    this.router.post("/", (req, res) => {
      console.log(req.body);
      res.send("add money log");
    });

    this.router.put("/", (req, res) => {
      res.send("edit money log");
    });

    this.router.delete("/", (req, res) => {
      res.send("delete money log");
    });
  }
}

export default new MoneyLogRoutes().router;
