import { UserRepository } from "../../../infrastructure/repository/user-repository";
import { User } from "../../../shared/user";

export class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  getUserById(userId: number) {
    return this.userRepository.getUser(userId);
  }

  getAllUsers() {
    return this.userRepository.listUsers();
  }

  createUser(user: User) {
    return this.userRepository.createUser(user);
  }

  deleteUser(userId: number) {
    return this.userRepository.deleteUser(userId);
  }
}
