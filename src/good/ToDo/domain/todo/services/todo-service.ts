import { ToDo } from "../../../shared/entity/todo";

export interface IToDoService {
  findTodo(id: string): Promise<ToDo>;
  listTodos(): Promise<Array<ToDo>>;
  createTodo(todo: ToDo): Promise<ToDo>;
  updateTodo(todo: ToDo): Promise<ToDo>;
  patchTodo(todo: Partial<ToDo>): Promise<ToDo>;
  deleteTodo(id: string): Promise<ToDo>;
}
