import { Router } from "express";
import { UserController } from "../controllers/user-controller";

export const userRouter = Router();
const userController = new UserController();

userRouter.get("", userController.getAllUsers);
userRouter.get("/:id(\\d+)", userController.getUser);
userRouter.post("/", userController.createUser);
userRouter.delete("/:id", userController.deleteUser);
