import { ToDo } from "../../../shared/entity/todo";
import { IUseCase } from "../../../shared/interfaces/use-case";
import { IToDoService } from "../services/todo-service";

export class DeleteToDoUseCase implements IUseCase<string, Promise<ToDo>> {
  constructor(private todoService: IToDoService) {
    this.execute = this.execute.bind(this);
  }

  async execute(id: string) {
    return this.todoService.deleteTodo(id);
  }
}
