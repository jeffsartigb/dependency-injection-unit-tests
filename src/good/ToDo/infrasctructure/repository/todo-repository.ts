import { ToDo } from "../../shared/entity/todo";

export interface IToDoRepository {
  getOne(id: string): Promise<any>;
  getAll(): Promise<Array<any>>;
  exists(id: string): Promise<boolean>;
  exists(name: string): Promise<boolean>;
  create(todo: ToDo): Promise<any>;
  update(todo: ToDo): Promise<any>;
  patch(todo: Partial<ToDo>): Promise<any>;
  delete(id: string): Promise<any>;
}
