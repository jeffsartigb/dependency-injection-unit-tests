import { UserService } from "../service/user-service";

export class GetUserUseCase {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  execute(userId: number) {
    if (userId <= 0) {
      throw new Error();
    }
    return this.userService.getUserById(userId);
  }
}
