import { describe, expect, it, vi } from "vitest";
import type { IUserRepository } from "./users.repository.js";
import { UserService } from "./users.service.js";


describe("Users service test", () => {

  it("Should create a user", async () => {
    const mockedRepository: IUserRepository = {
      create: vi.fn().mockResolvedValue({
        id: "uuid",
        username: "Nabitest",
        email: "nabitest@gmail.com",
        password: "mdp123",
        age: 20
      }),
      findById: vi.fn(),
      findAll: vi.fn(),
      deleteById: vi.fn(),
      findByEmail: vi.fn()
    };
    const service = new UserService(mockedRepository);

    const input = {
      username: "Nabitest",
      email: "nabitest@gmail.com",
      password: "mdp123",
      age: 20
    }
    const user = await service.createUser(input);

    expect(user).not.toBeNull();
    expect(user.username).toBe("Nabitest");
    expect(mockedRepository.create).toHaveBeenCalledOnce();
    expect(mockedRepository.create).toHaveBeenCalledWith(input);
  });

  it("Should throw an error if repository return null", async () => {
    const mockedRepository: IUserRepository = {
      create: vi.fn().mockResolvedValue(null),
      findById: vi.fn(),
      findAll: vi.fn(),
      deleteById: vi.fn(),
      findByEmail: vi.fn()
    };
    const service = new UserService(mockedRepository);

    const input = {
      username: "Nabitest",
      email: "nabitest@gmail.com",
      password: "mdp123",
      age: 20
    }

    await expect(service.createUser(input)).rejects.toThrow("Erreur lors de la création de l'utilisateur")
  })
});
