import { IToDoService } from "../todo-service";
import { IToDoRepository } from "../../../../infrasctructure/repository/todo-repository";
import { ToDo } from "../../../../shared/entity/todo";
import { ToDoMap } from "../../../../shared/dto/todo-mapper";

export class ToDoService implements IToDoService {
  constructor(private todoRepository: IToDoRepository) {}

  async findTodo(id: string): Promise<ToDo> {
    console.log(id);
    return ToDoMap.toEntity(await this.todoRepository.getOne(id));
  }
  async listTodos(): Promise<ToDo[]> {
    const todos = await this.todoRepository.getAll();
    return todos.map((todo) => ToDoMap.toEntity(todo));
  }
  async createTodo(todo: ToDo): Promise<ToDo> {
    return ToDoMap.toEntity(await this.todoRepository.create(todo));
  }
  async updateTodo(todo: ToDo): Promise<ToDo> {
    return ToDoMap.toEntity(await this.todoRepository.update(todo));
  }
  async patchTodo(todo: Partial<ToDo>): Promise<ToDo> {
    return ToDoMap.toEntity(await this.todoRepository.patch(todo));
  }
  async deleteTodo(id: string): Promise<ToDo> {
    return ToDoMap.toEntity(await this.todoRepository.delete(id));
  }
}
