import { TODOS_OPERATIONS } from "../../interfaces/todo-operations";

const DEFAULT_MESSAGE = "An error ocurred while accessing the database";
export class ToDoRepositoryError extends Error {
  constructor(
    public operation: TODOS_OPERATIONS,
    public query: any,
    message?: string
  ) {
    super(message || DEFAULT_MESSAGE);
    this.name = "ToDoRepositoryError";
  }
}
