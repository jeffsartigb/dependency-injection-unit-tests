import { User } from "../../../shared/user";
import { generateNewId } from "../../../shared/utils";
import { UserService } from "../service/user-service";

export class CreateUserUseCase {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  execute(userData: Omit<User, "id" | "createdAt" | "updatedAt">) {
    const user = {
      id: generateNewId(),
      name: userData.name,
      email: userData.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as User;
    return this.userService.createUser(user);
  }
}
