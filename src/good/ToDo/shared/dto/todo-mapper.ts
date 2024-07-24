import { ToDo, ToDoStatus } from "../entity/todo";

export class ToDoMap {
  constructor() {}

  static toDomain(raw: any): ToDo {
    return {
      id: raw.id,
      name: raw.name,
      dueDate: raw.dueDate,
      status: raw.status || ToDoStatus.PENDING,
    } as ToDo;
  }

  static toPersistance(todo: ToDo) {
    return {
      id: todo.id,
      name: todo.name,
      dueDate: todo.dueDate,
      status: todo.status,
    };
  }

  static toEntity(todo: ToDo): ToDo {
    return {
      id: todo.id,
      name: todo.name,
      dueDate: todo.dueDate,
      status: todo.status,
      createdAt: todo.createdAt,
      updatedAt: todo.createdAt,
    };
  }
}
