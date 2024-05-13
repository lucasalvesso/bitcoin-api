import { AccountController } from "../../../src/controller/AccountController";
import { container } from "tsyringe";

describe("AccountController", () => {
  let controller: AccountController;

  beforeEach(() => {
    controller = container.resolve(AccountController);
    (controller as any).useCase = { execute: jest.fn() };
  });

  const request = {} as any;
  const response = {} as any;
  response.json = jest.fn();
  response.status = jest.fn(() => response);

  it("should have errors due to wrong body format", async () => {
    request.body = {};
    await expect(
      async () => await controller.save(request, response),
    ).rejects.toThrow("name not valid");

    request.body = { name: "name" };
    await expect(
      async () => await controller.save(request, response),
    ).rejects.toThrow("email not valid");

    request.body = { name: "name", email: "email@email.com" };
    await expect(
      async () => await controller.save(request, response),
    ).rejects.toThrow("password not valid");

    expect((controller as any).useCase.execute).not.toHaveBeenCalled();
  });

  it("should return status 201 and message", async () => {
    request.body = {};
    await expect(
      async () => await controller.save(request, response),
    ).rejects.toThrow("name not valid");

    request.body = { name: "name" };
    await expect(
      async () => await controller.save(request, response),
    ).rejects.toThrow("email not valid");

    request.body = { name: "name", email: "email@email.com" };
    await expect(
      async () => await controller.save(request, response),
    ).rejects.toThrow("password not valid");

    request.body = { name: "name", email: "email@email.com", password: "pass" };
    await controller.save(request, response);

    expect(response.json).toHaveBeenCalledWith({
      message: "Account created successfully",
    });

    expect(response.status).toHaveBeenCalledWith(201);
  });
});
