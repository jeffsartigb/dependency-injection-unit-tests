import { Request, Response } from "express";
import { BaseController } from "../../../shared/express/base-controller";
import { RawToDo, ToDo } from "../../../shared/entity/todo";
import { IUseCase } from "../../../shared/interfaces/use-case";
import { ToDoRepositoryError } from "../../../shared/utils/errors/todo-repository-error";
import { Middleware } from "../../../shared/express/middleware";

export class CreateToDoController extends BaseController {
  constructor(
    localMiddlewares: Middleware[],
    private createToDoUseCase: IUseCase<RawToDo, Promise<ToDo>>
  ) {
    super(localMiddlewares);
  }

  async execute(req: Request<any, ToDo, RawToDo, any>, res: Response) {
    try {
      const todo = await this.createToDoUseCase.execute(req.body);
      return res.status(201).json(todo);
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
