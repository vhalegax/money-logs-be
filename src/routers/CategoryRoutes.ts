import { Router, Request, Response } from "express";
import IntRouter from "./../interfaces/IntRoute";

import CategoryController from "../controller/CategoryController";

class CategoryRoutes implements IntRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get("/", CategoryController.index);
    this.router.get("/:id", CategoryController.detail);
    this.router.post("/", CategoryController.create);
    this.router.put("/", CategoryController.update);
    this.router.delete("/", CategoryController.delete);
  }
}

export default new CategoryRoutes().router;
