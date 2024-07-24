import { User } from "../../shared/user";

export class UserRepository {
  users: User[] = [];
  constructor() {
    // db connection logic
  }

  getUser(userId: number) {
    return this.users.find(({ id }) => id === userId);
  }

  listUsers() {
    return this.users;
  }

  createUser(user: User) {
    this.users.push(user);
    return user;
  }

  deleteUser(userId: number) {
    const deletedUser = this.users.find(({ id }) => id === userId);
    if (deletedUser) {
      this.users = this.users.filter(({ id }) => id !== userId);
      return deletedUser;
    }
    throw new Error(`User ${userId} not found.`);
  }
}
