import { Request, Response } from "express";
import { BaseController } from "../../../shared/express/base-controller";
import { ToDo } from "../../../shared/entity/todo";
import { IUseCase } from "../../../shared/interfaces/use-case";
import { ToDoRepositoryError } from "../../../shared/utils/errors/todo-repository-error";
import { Middleware } from "../../../shared/express/middleware";

export class ListToDosController extends BaseController {
  constructor(
    localMiddlewares: Middleware[],
    private listToDosUseCase: IUseCase<any, Promise<ToDo[]>>
  ) {
    super(localMiddlewares);
    this.execute = this.execute.bind(this);
  }

  async execute(_: Request<any, ToDo, any, any>, res: Response) {
    try {
      const todos = await this.listToDosUseCase.execute();
      return res.status(200).json(todos);
    } catch (err: ToDoRepositoryError | any) {
      if (err instanceof ToDoRepositoryError) {
        return res.status(400).json({
          message: err.message,
          name: err.name,
          operation: err.operation,
          data: err.query,
        });
      }
      console.log(err);
      return res.status(500).json({
        message: err?.message || "Something bad happened.",
      });
    }
  }
}
