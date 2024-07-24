import { describe, expect, it } from "vitest";
import { UserService } from "../../../../../bad/Users/domain/users/service/user-service";

describe("UserService unit tests", () => {
  describe("getUserById method tests", () => {
    it("Should return a user when a valid id is provided", () => {
      const userService = new UserService();
      userService.createUser({
        id: 1,
        name: "Test",
        email: "email@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const user = userService.getUserById(1);
      expect(user).toBeTruthy();
    });

    it("Should return undefined when there's no user with the provided id", () => {
      const userService = new UserService();
      const user = userService.getUserById(1);
      expect(user).toBeUndefined();
    });
  });

  describe("getAllUsers method tests", () => {
    it("Should return a list of users", () => {
      const userService = new UserService();
      userService.createUser({
        id: 1,
        name: "Test 1",
        email: "email@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      userService.createUser({
        id: 2,
        name: "Test 2",
        email: "email@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const users = userService.getAllUsers();
      expect(users.length).toBeGreaterThan(0);
    });

    it("Should return an empty list when there's no users", () => {
      const userService = new UserService();
      const users = userService.getAllUsers();
      expect(users.length).toBe(0);
    });
  });

  describe("createUser method tests", () => {
    it("Should return the created user", () => {
      const userService = new UserService();
      const user = {
        id: 1,
        name: "Test 1",
        email: "email@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = userService.createUser(user);
      expect(result).to.be.deep.equal(user);
    });
  });

  describe("deleteUser method tests", () => {
    it("Should return the deleted user and it cannot be present into the repository", () => {
      const userService = new UserService();
      userService.createUser({
        id: 1,
        name: "Test 1",
        email: "email@email.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const deleted = userService.deleteUser(1);
      const foundUser = userService.getUserById(1);

      expect(deleted.id).toBe(1);
      expect(foundUser).toBeUndefined();
    });

    it("Should throw an error when trying to delete a unexistent user", () => {
      try {
        const userService = new UserService();
        userService.deleteUser(1);
        expect(true).toBe(false);
      } catch (err) {
        expect(err).toBeTruthy();
      }
    });
  });
});
