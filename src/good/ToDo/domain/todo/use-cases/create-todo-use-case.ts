import { RawToDo, ToDo, ToDoStatus } from "../../../shared/entity/todo";
import { IToDoService } from "../services/todo-service";
import { ToDoMap } from "../../../shared/dto/todo-mapper";
import { IUseCase } from "../../../shared/interfaces/use-case";
import { generateRandomId } from "../../../shared/utils/id/generateRandomId";

export class CreateToDoUseCase implements IUseCase<RawToDo, Promise<ToDo>> {
  constructor(private todoService: IToDoService) {
    this.execute = this.execute.bind(this);
  }

  async execute(rawTodo: { name: string; dueDate: Date }): Promise<ToDo> {
    const todo = ToDoMap.toDomain({
      id: generateRandomId(),
      name: rawTodo.name,
      dueDate: rawTodo.dueDate,
      status: ToDoStatus.PENDING,
    });
    return await this.todoService.createTodo(todo);
  }
}
