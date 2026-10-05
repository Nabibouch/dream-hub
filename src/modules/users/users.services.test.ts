import { describe, expect, it, vi } from "vitest";
import type { IUserRepository } from "./users.repository.js";
import { UserService } from "./users.service.js";


describe("Users service test", () => {

  const output = {
    id: "uuid",
    username: "Nabitest",
    email: "nabitest@gmail.com",
    password: "mdp123",
    age: 20
  }

  it("should get a user by id", async () => {
    const mockedRepository: IUserRepository = {
      findById: vi.fn().mockResolvedValue(output),
      findAll: vi.fn(),
      deleteById: vi.fn(),
      findByEmail: vi.fn()
    };
    const service = new UserService(mockedRepository);
    const user = await service.getUserById('uuid');

    expect(user).not.toBeNull();
    expect(user!.username).toBe("Nabitest");
  });

  it("should throw an error if user is not in db", async () => {
    const mockedRepository: IUserRepository = {
      findById: vi.fn().mockResolvedValue(null),
      deleteById: vi.fn(),
      findAll: vi.fn(),
      findByEmail: vi.fn()
    };
    const service = new UserService(mockedRepository);

    await expect(service.getUserById("uuid")).rejects.toThrow();
  })

  it("should find a user by email", async () => {
    const mockedRepository: IUserRepository = {
      findById: vi.fn(),
      deleteById: vi.fn(),
      findAll: vi.fn(),
      findByEmail: vi.fn().mockResolvedValue(output)
    };
    const service = new UserService(mockedRepository);
    const user = await service.getUserByEmail("nabitest@gmail.com");

    expect(user.id).toBe("uuid");
    expect(user.email).toBe("nabitest@gmail.com");
  })

  it("should get all users", async () => {
    const mockedRepository: IUserRepository = {
      findById: vi.fn(),
      deleteById: vi.fn(),
      findAll: vi.fn().mockResolvedValue([
        {
          "id": "uuid1",
          "username": "Nabitest1",
          "age": 22,
          "password": "mdp123",
          "email": "nabitest1@gmail.com",
          "bio": null,
          "created_at": "2026-04-08T14:59:34.311Z"
        },
        {
          "id": "uuid2",
          "username": "Nabitest2",
          "age": 22,
          "password": "mdp123",
          "email": "nabitest2@gmail.com",
          "bio": null,
          "created_at": "2026-04-08T14:59:34.311Z"
        }
      ]),
      findByEmail: vi.fn()
    }

    const service = new UserService(mockedRepository);
    const users = await service.getAllUsers();

    expect(users).not.toBeNull();
    expect(users[0]).toStrictEqual({
      "id": "uuid1",
      "username": "Nabitest1",
      "age": 22,
      "password": "mdp123",
      "email": "nabitest1@gmail.com",
      "bio": null,
      "created_at": "2026-04-08T14:59:34.311Z"
    })
  })

  it("should delete a user by id", async () => {
    const mockedRepository: IUserRepository = {
      findById: vi.fn(),
      deleteById: vi.fn().mockResolvedValue(output),
      findAll: vi.fn(),
      findByEmail: vi.fn()
    }
    const service = new UserService(mockedRepository);
    const deletedUser = await service.deleteUserById("uuid");

    expect(deletedUser).not.toBeNull();
    expect(deletedUser.username).toBe("Nabitest");
  })

  it("should throw if user not found when calling deleteUserById", async () => {
    const mockedRepository: IUserRepository = {
      findById: vi.fn(),
      deleteById: vi.fn().mockResolvedValue(null),
      findAll: vi.fn(),
      findByEmail: vi.fn()
    }
    const service = new UserService(mockedRepository);
    await expect(service.deleteUserById("uuid")).rejects.toThrow("Aucun utilisateur avec l'id uuid n'a été trouvé")
  })
  it("should throw if user not found when calling getUserByEmail", async () => {
    const mockedRepository: IUserRepository = {
      findById: vi.fn(),
      deleteById: vi.fn(),
      findAll: vi.fn(),
      findByEmail: vi.fn().mockResolvedValue(null)
    }
    const service = new UserService(mockedRepository);
    await expect(service.getUserByEmail("nabitest@gmail.com")).rejects.toThrow("Aucun utilisateur avec l'email nabitest@gmail.com n'a été trouvé");
  })
});
