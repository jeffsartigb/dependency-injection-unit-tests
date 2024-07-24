import { ToDo } from "../../../shared/entity/todo";
import { IUseCase } from "../../../shared/interfaces/use-case";
import { IToDoService } from "../services/todo-service";

export class UpdateToDoUseCase implements IUseCase<ToDo, Promise<ToDo>> {
  constructor(private todoService: IToDoService) {
    this.execute = this.execute.bind(this);
  }

  async execute(todo: ToDo) {
    return this.todoService.updateTodo(todo);
  }
}
