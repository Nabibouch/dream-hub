import { describe, expect, it } from "vitest";
import { db } from "../../db/index.js";
import { UserRepository } from "./users.repository.js";


describe("User repository test", () => {
  it("should create a user", async () => {
    await db.transaction(async (tx) => {
      const repository = new UserRepository(tx);

      const user = await repository.create({
              username: "test",
              email: "test@test.com",
              password: "pass",
              age: 20
            });

      expect(user).not.toBeNull();
      expect(user?.username).toBe("test");

      throw new Error("ROLLBACK");
    }).catch((err) => {
      if ((err as Error).message !== "ROLLBACK") throw err;
    });
  });

  it("should find a user by id", async () => {
    await db.transaction(async (tx) => {
      const repository = new UserRepository(tx);

      const user = await repository.create({
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

      await repository.create({
        username: "Nabitest",
        email: "nabitest@gmail.com",
        password: "mdp123",
        age: 20
      });
      await repository.create({
        username: "Nabitest2",
        email: "nabitest2@gmail.com",
        password: "mdp123",
        age: 20
      });
      await repository.create({
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

      const user1 = await repository.create({
        username: "Nabitest",
        email: "nabitest@gmail.com",
        password: "mdp123",
        age: 20
      });
      await repository.create({
        username: "Nabitest2",
        email: "nabitest2@gmail.com",
        password: "mdp123",
        age: 20
      });
      await repository.create({
        username: "Nabitest3",
        email: "nabitest3@gmail.com",
        password: "mdp123",
        age: 20
      });

      const deletedUser = await repository.deleteById(user1!.id);
      const allUsers = await repository.findAll();

      expect(deletedUser).not.toBeNull();
      expect(allUsers.length).toBe(3);

      throw new Error("ROLLBACK");
    }).catch((err) => {
      if ((err as Error).message !== "ROLLBACK") throw err;
    });
  });


});
