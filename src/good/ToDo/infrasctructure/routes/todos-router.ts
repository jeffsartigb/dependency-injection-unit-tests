import { Router } from "express";
import { BaseController } from "../../shared/express/base-controller";
import { Middleware } from "../../shared/express/middleware";

export class TodosRouter {
  listToDosController: BaseController;
  findToDoController: BaseController;
  createToDoController: BaseController;
  constructor(
    private globalMiddlewares: Middleware[],
    controllers: {
      listToDosController: BaseController;
      findToDoController: BaseController;
      createToDoController: BaseController;
    }
  ) {
    this.listToDosController = controllers.listToDosController;
    this.findToDoController = controllers.findToDoController;
    this.createToDoController = controllers.createToDoController;
  }

  public mount() {
    const router = Router();
    router.get(
      "/",
      ...this.globalMiddlewares,
      ...this.listToDosController.localMiddlewares,
      this.listToDosController.execute
    );

    router.get(
      "/:id",
      ...this.globalMiddlewares,
      ...this.findToDoController.localMiddlewares,
      this.findToDoController.execute
    );

    router.post(
      "/",
      ...this.globalMiddlewares,
      ...this.createToDoController.localMiddlewares,
      this.createToDoController.execute
    );
    return router;
  }
}
