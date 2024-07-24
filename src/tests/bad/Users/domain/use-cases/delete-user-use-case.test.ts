import { describe, expect, it } from "vitest";
import { CreateUserUseCase } from "../../../../../bad/Users/domain/users/use-cases/create-user-use-case";
import { DeleteUserUseCase } from "../../../../../bad/Users/domain/users/use-cases/delete-user-use-case";

describe("DeleteUserUseCase unit tests", () => {
  it("Should delete from repository and return the deleted user", () => {
    const createUserUseCase = new CreateUserUseCase();
    const deleteUserUseCase = new DeleteUserUseCase();
    const user = createUserUseCase.execute({
      email: "test@test.com",
      name: "Test",
    });

    const deletedUser = deleteUserUseCase.execute(user.id);
    expect(deletedUser.id).toBe(user.id); // fails
  });
});
