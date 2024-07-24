import { Request, Response } from "express";
import { CreateUserUseCase } from "../../domain/users/use-cases/create-user-use-case";
import { DeleteUserUseCase } from "../../domain/users/use-cases/delete-user-use-case";
import { GetAllUsersUseCase } from "../../domain/users/use-cases/get-all-users-use-case";
import { GetUserUseCase } from "../../domain/users/use-cases/get-user-use-case";

export class UserController {
  private getUserUseCase: GetUserUseCase;
  private getAllUsersUseCase: GetAllUsersUseCase;
  private createUserUseCase: CreateUserUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  constructor() {
    this.getUserUseCase = new GetUserUseCase();
    this.getAllUsersUseCase = new GetAllUsersUseCase();
    this.createUserUseCase = new CreateUserUseCase();
    this.deleteUserUseCase = new DeleteUserUseCase();
  }

  getUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      if (Number.isNaN(userId)) {
        return res.status(400).json({
          message: `${req.params.id} is not a valid id`,
        });
      }
      const user = this.getUserUseCase.execute(userId);
      if (user) {
        return res.status(200).json(user);
      }

      return res.status(404).json({
        message: `User not found`,
        queryData: {
          id: userId,
        },
      });
    } catch (err: any) {
      return res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }

  getAllUsers(_: Request, res: Response) {
    try {
      const users = this.getAllUsersUseCase.execute();
      return res.status(200).json({
        users,
      });
    } catch (err: any) {
      return res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }

  createUser(req: Request, res: Response) {
    try {
      const { name, email } = req.body;
      if (!name || typeof name !== "string") {
        return res.status(400).json({
          message: `A valid name must be provided`,
        });
      }

      if (!email || typeof email !== "string") {
        return res.status(400).json({
          message: `A valid email must be provided`,
        });
      }

      const user = this.createUserUseCase.execute({ name, email });
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }

  deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      if (Number.isNaN(userId)) {
        return res.status(400).json({
          message: `${req.params.id} is not a valid id`,
        });
      }
      const user = this.deleteUserUseCase.execute(userId);
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(500).json({
        message: "Something went wrong.",
      });
    }
  }
}
