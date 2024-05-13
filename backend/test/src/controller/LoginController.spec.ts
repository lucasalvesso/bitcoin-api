import { container } from "tsyringe";
import { LoginController } from "../../../src/controller/LoginController";

describe("LoginController", () => {
  let controller: LoginController;
  let request: any;
  let response: any;

  beforeEach(() => {
    controller = container.resolve(LoginController);
    (controller as any).useCase = {
      execute: jest.fn().mockReturnValue(""),
    };

    request = {
      loggedUser: { email: "" },
    };
    response = {};
    response.json = jest.fn();
    response.status = jest.fn(() => response);
  });

  it("should have errors on login method due to wrong body format", async () => {
    request.body = {};
    await expect(
      async () => await controller.login(request, response),
    ).rejects.toThrow("email not valid");

    request.body = { email: "name" };
    await expect(
      async () => await controller.login(request, response),
    ).rejects.toThrow("email not valid");

    request.body = { email: "email@email.com" };
    await expect(
      async () => await controller.login(request, response),
    ).rejects.toThrow("password not valid");

    expect((controller as any).useCase.execute).not.toHaveBeenCalled();
  });

  it("should return status 200 and token on login method", async () => {
    request.body = { email: "email@email.com", password: "pass" };
    await controller.login(request, response);

    expect(response.json).toHaveBeenCalledWith({
      token: "",
    });

    expect(response.status).toHaveBeenCalledWith(200);
  });
});
