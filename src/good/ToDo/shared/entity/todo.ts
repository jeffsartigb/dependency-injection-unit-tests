export type ToDo = {
  id: string;
  name: string;
  dueDate: Date;
  status: ToDoStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type RawToDo = { name: string; dueDate: Date };

export enum ToDoStatus {
  "PENDING" = "PENDING",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "ARCHIVED" = "ARCHIVED",
  "CANCELED" = "CANCELED",
}
