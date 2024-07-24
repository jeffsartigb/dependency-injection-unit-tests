import { describe, expect, it, test } from "vitest";
import { CreateUserUseCase } from "../../../../../bad/Users/domain/users/use-cases/create-user-use-case";
import { GetUserUseCase } from "../../../../../bad/Users/domain/users/use-cases/get-user-use-case";

describe("GetAllUsersUseCase unit tests", () => {
  test("Given a valid, existing id, it should return the user with that id", () => {
    const createUserUseCase = new CreateUserUseCase();
    const getUserUseCase = new GetUserUseCase();
    const user = createUserUseCase.execute({
      email: "test1@test.com",
      name: "Test 1",
    });

    const returnedUser = getUserUseCase.execute(user.id);
    expect(returnedUser).not.toBeUndefined(); // fails
  });
});
