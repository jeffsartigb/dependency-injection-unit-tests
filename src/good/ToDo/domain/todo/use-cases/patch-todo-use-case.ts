import { ToDo } from "../../../shared/entity/todo";
import { IUseCase } from "../../../shared/interfaces/use-case";
import { IToDoService } from "../services/todo-service";

export class PatchToDoUseCase
  implements IUseCase<Partial<ToDo>, Promise<ToDo>>
{
  constructor(private todoService: IToDoService) {
    this.execute = this.execute.bind(this);
  }

  async execute(todo: Partial<ToDo>) {
    return this.todoService.patchTodo(todo);
  }
}
