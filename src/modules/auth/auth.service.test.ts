import { describe, expect, it, vi } from "vitest";
import type { IAuthRepository } from "./auth.repository.js";
import { AuthService } from "./auth.service.js";
import { hashPassword } from "@/common/security/password.js";
import { ConflictError } from "@/common/errors/ConflictError.js";
import { UnauthorizedError } from "@/common/errors/UnauthorizedError.js";


describe("Auth service test", () => {

  const registerInput = {
    username: "Nabitest",
    email: "nabitest@gmail.com",
    password: "mdp123",
    age: 20
  };

  const mockRepository = (overrides: Partial<IAuthRepository> = {}): IAuthRepository => ({
    create: vi.fn(),
    findByMail: vi.fn().mockResolvedValue(null),
    ...overrides
  });

  it("should register a user without returning the password", async () => {
    const repository = mockRepository({
      create: vi.fn().mockImplementation(async (data) => ({ id: "uuid", created_at: null, bio: null, ...data }))
    });
    const service = new AuthService(repository);

    const user = await service.register(registerInput);

    expect(user).not.toHaveProperty("password");
    expect(user.email).toBe("nabitest@gmail.com");
    expect(repository.create).toHaveBeenCalledOnce();
    expect(repository.create).toHaveBeenCalledWith(expect.objectContaining({ password: expect.not.stringContaining("mdp123") }));
  });

  it("should throw a ConflictError if email is already used", async () => {
    const repository = mockRepository({
      findByMail: vi.fn().mockResolvedValue({ id: "uuid", email: "nabitest@gmail.com" })
    });
    const service = new AuthService(repository);

    await expect(service.register(registerInput)).rejects.toThrow(ConflictError);
    expect(repository.create).not.toHaveBeenCalled();
  });

  it("should login and return the user without the password", async () => {
    const hashed = await hashPassword("mdp123");
    const repository = mockRepository({
      findByMail: vi.fn().mockResolvedValue({ id: "uuid", email: "nabitest@gmail.com", password: hashed })
    });
    const service = new AuthService(repository);

    const user = await service.login({ email: "nabitest@gmail.com", password: "mdp123" });

    expect(user.id).toBe("uuid");
    expect(user).not.toHaveProperty("password");
  });

  it("should throw an UnauthorizedError if email is unknown", async () => {
    const service = new AuthService(mockRepository());

    await expect(service.login({ email: "unknown@gmail.com", password: "mdp123" }))
      .rejects.toThrow(new UnauthorizedError("Email ou mot de passe incorrect"));
  });

  it("should throw an UnauthorizedError if password is wrong", async () => {
    const hashed = await hashPassword("mdp123");
    const repository = mockRepository({
      findByMail: vi.fn().mockResolvedValue({ id: "uuid", email: "nabitest@gmail.com", password: hashed })
    });
    const service = new AuthService(repository);

    await expect(service.login({ email: "nabitest@gmail.com", password: "wrongpass" }))
      .rejects.toThrow(UnauthorizedError);
  });
});
