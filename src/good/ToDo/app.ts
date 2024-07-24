import express from "express";
import cors from "cors";
import { TodosRouter } from "./infrasctructure/routes/todos-router";
import { CreateToDoController } from "./infrasctructure/controllers/todo/create-todo-controller";
import { CreateToDoUseCase } from "./domain/todo/use-cases/create-todo-use-case";
import { ToDoService } from "./domain/todo/services/implementations/todo-service";
import { ToDoRepository } from "./infrasctructure/repository/implementations/in-memory-todo-repository";
import { FindToDoUseCase } from "./domain/todo/use-cases/find-todo-use-case";
import { FindToDoController } from "./infrasctructure/controllers/todo/find-todo-controller";
import { ListToDoUseCase } from "./domain/todo/use-cases/list-todos-use-case";
import { ListToDosController } from "./infrasctructure/controllers/todo/list-todos-controller";

export const goodApp = express();

goodApp.use(express.json());
goodApp.use(cors());

const todoRepository = ToDoRepository.getInstance();
const todoService = new ToDoService(todoRepository);
const createToDoUseCase = new CreateToDoUseCase(todoService);
const createToDoController = new CreateToDoController([], createToDoUseCase);
const findToDoUseCase = new FindToDoUseCase(todoService);
const findToDoController = new FindToDoController([], findToDoUseCase);
const listToDosUseCase = new ListToDoUseCase(todoService);
const listToDosController = new ListToDosController([], listToDosUseCase);

goodApp.use(
  "/todos",
  new TodosRouter([], {
    findToDoController,
    createToDoController,
    listToDosController,
  }).mount()
);
