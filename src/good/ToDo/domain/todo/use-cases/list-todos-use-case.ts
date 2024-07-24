import { ToDo } from "../../../shared/entity/todo";
import { IUseCase } from "../../../shared/interfaces/use-case";
import { IToDoService } from "../services/todo-service";

export class ListToDoUseCase implements IUseCase<undefined, Promise<ToDo[]>> {
  constructor(private todoService: IToDoService) {
    this.execute = this.execute.bind(this);
  }

  async execute() {
    return this.todoService.listTodos();
  }
}
