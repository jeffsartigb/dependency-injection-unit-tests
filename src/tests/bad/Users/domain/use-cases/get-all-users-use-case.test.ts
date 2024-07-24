import { describe, expect, it } from "vitest";
import { CreateUserUseCase } from "../../../../../bad/Users/domain/users/use-cases/create-user-use-case";
import { GetAllUsersUseCase } from "../../../../../bad/Users/domain/users/use-cases/get-all-users-use-case";

describe("GetAllUsersUseCase unit tests", () => {
  it("Should list all created users", () => {
    const createUserUseCase = new CreateUserUseCase();
    const getAllUsersUseCase = new GetAllUsersUseCase();
    createUserUseCase.execute({
      email: "test1@test.com",
      name: "Test 1",
    });
    createUserUseCase.execute({
      email: "test2@test.com",
      name: "Test 2",
    });

    const users = getAllUsersUseCase.execute();
    expect(users.length).toBeGreaterThanOrEqual(2); // fails
  });
});
