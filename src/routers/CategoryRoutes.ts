import { Router, Request, Response } from "express";
import IntRouter from "./../interfaces/IntRoute";

class CategoryRoutes implements IntRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.send("index categories");
    });

    this.router.get("/:id", (req, res) => {
      res.send("detail category");
    });

    this.router.post("/", (req, res) => {
      console.log(req.body);
      res.send("add category");
    });

    this.router.put("/", (req, res) => {
      res.send("edit category");
    });

    this.router.delete("/", (req, res) => {
      res.send("delete category");
    });
  }
}

export default new CategoryRoutes().router;
