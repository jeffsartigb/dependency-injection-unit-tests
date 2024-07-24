import { ToDo } from "../../../shared/entity/todo";
import { TODOS_OPERATIONS } from "../../../shared/interfaces/todo-operations";
import { ToDoRepositoryError } from "../../../shared/utils/errors/todo-repository-error";
import { IToDoRepository } from "../todo-repository";

export class ToDoRepository implements IToDoRepository {
  private todos: ToDo[] = [];
  private static instance: ToDoRepository;
  private constructor() {
    this.getOne = this.getOne.bind(this);
    this.getAll = this.getAll.bind(this);
    this.exists = this.exists.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
  }

  public static getInstance(): ToDoRepository {
    if (!ToDoRepository.instance) {
      ToDoRepository.instance = new ToDoRepository();
    }

    return ToDoRepository.instance;
  }

  async getOne(id: string): Promise<ToDo> {
    const todo = this.todos.find(({ id: todoId }) => {
      return id === todoId;
    });
    if (!todo) {
      throw new ToDoRepositoryError(
        TODOS_OPERATIONS.FIND_TODO,
        { id },
        `ToDo with id ${id} does not exists.`
      );
    }
    return todo;
  }

  async getAll(): Promise<ToDo[]> {
    return this.todos;
  }

  exists(id: string): Promise<boolean>;
  exists(name: number): Promise<boolean>;
  async exists(query: unknown): Promise<boolean> {
    const found = this.todos.find(({ id, name }) => {
      return id === query || name === query;
    });
    return !!found;
  }

  async create(todo: ToDo): Promise<ToDo> {
    todo.createdAt = new Date();
    todo.updatedAt = new Date();
    if (await this.exists(todo.name)) {
      throw new ToDoRepositoryError(
        TODOS_OPERATIONS.CREATE_TODO,
        todo,
        `ToDo with name ${todo.name} already exists`
      );
    }
    this.todos.push(todo);
    return this.todos[this.todos.length - 1];
  }

  async update(todo: ToDo): Promise<ToDo> {
    if (await this.exists(todo.id)) {
      const todoIndex = this.todos.findIndex(({ id }) => id === todo.id);
      todo.updatedAt = new Date();
      todo.createdAt = this.todos[todoIndex].createdAt;
      this.todos[todoIndex] = todo;
      return this.todos[todoIndex];
    }
    throw new ToDoRepositoryError(
      TODOS_OPERATIONS.UPDATE_TODO,
      todo,
      `ToDo with id ${todo.id} does not exists`
    );
  }

  async patch(todo: Partial<ToDo>): Promise<ToDo> {
    if (todo.id && (await this.exists(todo.id))) {
      todo.updatedAt = new Date();
      const todoIndex = this.todos.findIndex(({ id }) => id === todo.id);
      this.todos[todoIndex].name = todo.name || this.todos[todoIndex].name;
      this.todos[todoIndex].dueDate =
        todo.dueDate || this.todos[todoIndex].dueDate;
      this.todos[todoIndex].status =
        todo.status || this.todos[todoIndex].status;
      this.todos[todoIndex].updatedAt = todo.updatedAt;
      return this.todos[todoIndex];
    }
    throw new ToDoRepositoryError(
      TODOS_OPERATIONS.PATCH_TODO,
      todo,
      `ToDo with id ${todo.id} does not exists`
    );
  }

  async delete(id: string): Promise<ToDo> {
    if (await this.exists(id)) {
      const deletedTodo = this.getOne(id);
      this.todos = this.todos.filter(({ id: todoId }) => todoId !== id);
      return deletedTodo;
    }
    throw new ToDoRepositoryError(
      TODOS_OPERATIONS.DELETE_TODO,
      { id },
      `ToDo with id ${id} does not exists`
    );
  }
}
