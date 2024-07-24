import { Request, Response } from "express";
import { BaseController } from "../../../shared/express/base-controller";
import { ToDo } from "../../../shared/entity/todo";
import { IUseCase } from "../../../shared/interfaces/use-case";
import { ToDoRepositoryError } from "../../../shared/utils/errors/todo-repository-error";
import { Middleware } from "../../../shared/express/middleware";

export class FindToDoController extends BaseController {
  constructor(
    localMiddlewares: Middleware[],
    private findToDoUseCase: IUseCase<string, Promise<ToDo>>
  ) {
    super(localMiddlewares);
    this.execute = this.execute.bind(this);
  }

  async execute(req: Request<{ id: string }, ToDo, any, any>, res: Response) {
    try {
      console.log(req.params);
      const todo = await this.findToDoUseCase.execute(req.params.id);
      return res.status(200).json(todo);
    } catch (err: ToDoRepositoryError | any) {
      if (err instanceof ToDoRepositoryError) {
        return res.status(404).json({
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
