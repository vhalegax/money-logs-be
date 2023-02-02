import { Request, Response } from "express";

class MoneyLogController {
  index(req: Request, res: Response) {
    res.send("index");
  }

  detail(req: Request, res: Response) {
    res.send("detail");
  }

  create(req: Request, res: Response) {
    console.log(req.body);
    res.send("add");
  }

  update(req: Request, res: Response) {
    res.send("edit");
  }

  delete(req: Request, res: Response) {
    res.send("delete");
  }
}

export default new MoneyLogController();
