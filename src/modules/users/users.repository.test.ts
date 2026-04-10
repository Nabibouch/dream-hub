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



      const foundUser = await repository.findById(user?.id!);
      expect(foundUser).not.toBe(null);
      expect(foundUser?.username).toBe("Nabitest");

      throw new Error("ROLLBACK");
    }).catch((err) => {
      if ((err as Error).message !== "ROLLBACK") throw err;
    })
  })
});
