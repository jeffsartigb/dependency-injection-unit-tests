import { UserService } from "../service/user-service";

export class DeleteUserUseCase {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  execute(userId: number) {
    if (!this.userService.getUserById(userId)) {
      throw new Error(`User ${userId} does not exists`);
    }
    return this.userService.deleteUser(userId);
  }
}
