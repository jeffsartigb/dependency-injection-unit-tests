import { describe, expect, it } from "vitest";
import { CreateUserUseCase } from "../../../../../bad/Users/domain/users/use-cases/create-user-use-case";

describe("CreateUserUseCase unit tests", () => {
  it("Should create and return the user data", () => {
    const createUserUseCase = new CreateUserUseCase();
    const userData = {
      name: "Test",
      email: "email@email.com",
    };
    const user = createUserUseCase.execute(userData);
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.id).toBeTruthy();
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });
});
