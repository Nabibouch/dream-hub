import { describe, expect, it } from "vitest";
import { db } from "../../db/index.js";
import { UserRepository } from "./users.repository.js";
import { AuthRepository } from "../auth/auth.repository.js";


describe("User repository test", () => {
  it("should find a user by id", async () => {
    await db.transaction(async (tx) => {
      const repository = new UserRepository(tx);
      const authRepository = new AuthRepository(tx, repository);

      const user = await authRepository.create({
        username: "Nabitest",
        email: "nabitest@gmail.com",
        password: "mdp123",
        age: 20
      });

      const foundUser = await repository.findById(user!.id);
      expect(foundUser).not.toBe(null);
      expect(foundUser?.username).toBe("Nabitest");

      throw new Error("ROLLBACK");
    }).catch((err) => {
      if ((err as Error).message !== "ROLLBACK") throw err;
    });
  });

  it("Should find all the users", async () => {
    await db.transaction(async (tx) => {
      const repository = new UserRepository(tx);
      const authRepository = new AuthRepository(tx, repository);

      await authRepository.create({
        username: "Nabitest",
        email: "nabitest@gmail.com",
        password: "mdp123",
        age: 20
      });
      await authRepository.create({
        username: "Nabitest2",
        email: "nabitest2@gmail.com",
        password: "mdp123",
        age: 20
      });
      await authRepository.create({
        username: "Nabitest3",
        email: "nabitest3@gmail.com",
        password: "mdp123",
        age: 20
      });

      const users = await repository.findAll();

      const usernames = users.map((el) => el.username);
      const emails = users.map((el) => el.email);

      expect(users).not.toBeNull();
      expect(usernames).toContain("Nabitest");
      expect(usernames).toContain("Nabitest2");
      expect(usernames).toContain("Nabitest3");

      expect(emails).toContain("nabitest@gmail.com");
      expect(emails).toContain("nabitest2@gmail.com");
      expect(emails).toContain("nabitest3@gmail.com");

      throw new Error("ROLLBACK");
    }).catch((err) => {
      if ((err as Error).message !== "ROLLBACK") throw err;
    });
  });

  it("Should delete one user", async () => {
    await db.transaction(async (tx) => {
      const repository = new UserRepository(tx);
      const authRepository = new AuthRepository(tx, repository);

      const user1 = await authRepository.create({
        username: "Nabitest",
        email: "nabitest@gmail.com",
        password: "mdp123",
        age: 20
      });
      await authRepository.create({
        username: "Nabitest2",
        email: "nabitest2@gmail.com",
        password: "mdp123",
        age: 20
      });
      await authRepository.create({
        username: "Nabitest3",
        email: "nabitest3@gmail.com",
        password: "mdp123",
        age: 20
      });

      const deletedUser = await repository.deleteById(user1!.id);
      const allUsers = await repository.findAll();

      expect(deletedUser).not.toBeNull();
      expect(allUsers.map((el) => el.id)).not.toContain(user1!.id);

      throw new Error("ROLLBACK");
    }).catch((err) => {
      if ((err as Error).message !== "ROLLBACK") throw err;
    });
  });

  it("Should find a user by email", async () => {
    await db.transaction(async (tx) => {
      const repository = new UserRepository(tx);
      const authRepository = new AuthRepository(tx, repository);

      const user1 = await authRepository.create({
        username: "Nabitest",
        email: "nabitest@gmail.com",
        password: "mdp123",
        age: 20
      });

      const foundUser = await repository.findByEmail(user1!.email);

      expect(foundUser).not.toBeNull();
      expect(foundUser?.username).toBe("Nabitest");

      throw new Error("ROLLBACK");
    }).catch((err) => {
      if ((err as Error).message !== "ROLLBACK") throw err;
    })
  })
});
