import { Router, Request, Response } from "express";
import IntRouter from "./../interfaces/IntRoute";

import MoneyLogController from "../controller/MoneyLogController";

class MoneyLogRoutes implements IntRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get("/", MoneyLogController.index);
    this.router.get("/:id", MoneyLogController.detail);
    this.router.post("/", MoneyLogController.create);
    this.router.put("/", MoneyLogController.update);
    this.router.delete("/", MoneyLogController.delete);
  }
}

export default new MoneyLogRoutes().router;
