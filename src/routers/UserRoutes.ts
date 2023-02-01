import { Router, Request, Response } from "express";
import IntRouter from "./../interfaces/IntRoute";

class UserRoutes implements IntRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("index users");
    });

    this.router.get("/:id", (req, res) => {
      res.send("detail user");
    });

    this.router.post("/", (req, res) => {
      console.log(req.body);
      res.send("add user");
    });

    this.router.put("/", (req, res) => {
      res.send("edit user");
    });

    this.router.delete("/", (req, res) => {
      res.send("delete user");
    });
  }
}

export default new UserRoutes().router;
