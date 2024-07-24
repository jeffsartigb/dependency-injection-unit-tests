import { UserService } from "../service/user-service";

export class GetAllUsersUseCase {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  execute() {
    return this.userService.getAllUsers();
  }
}
