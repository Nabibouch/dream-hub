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

  it("Should create a user", async () => {
    const mockedRepository: IUserRepository = {
      create: vi.fn().mockResolvedValue(output),
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
  });

  it("Should throw an error if username is too short", async () => {
    const mockedRepository: IUserRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      deleteById: vi.fn(),
      findByEmail: vi.fn()
    };
    const service = new UserService(mockedRepository);

    const input = {
      username: "N",
      email: "nabitest@gmail.com",
      password: "mdp123",
      age: 20
    }

    await expect(service.createUser(input)).rejects.toThrow();
    expect(mockedRepository.create).not.toHaveBeenCalled();
  });

  it("should throw an error if email is invalid", async () => {
    const mockedRepository: IUserRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      deleteById: vi.fn(),
      findByEmail: vi.fn()
    }
    const service = new UserService(mockedRepository);

    const input = {
      username: "Nabitest",
      email: "invalid",
      password: "mdp123",
      age: 20
    }
    await expect(service.createUser(input)).rejects.toThrow();
    expect(mockedRepository.create).not.toHaveBeenCalled();
  });

  it("Should throw an error if password is too short", async () => {
    const mockedRepository: IUserRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      deleteById: vi.fn(),
      findByEmail: vi.fn()
    };

    const service = new UserService(mockedRepository);

    const input = {
      username: "Nabitest",
      email: "nabitest@gmail.com",
      password: "m",
      age: 20
    }
    await expect(service.createUser(input)).rejects.toThrow();
    expect(mockedRepository.create).not.toHaveBeenCalled();
  });

  it("should get a user by id", async () => {
    const mockedRepository: IUserRepository = {
      create: vi.fn(),
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


});
