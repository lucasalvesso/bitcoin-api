import { container } from "tsyringe";
import { WalletController } from "../../../src/controller/WalletController";

describe("WalletController", () => {
  let controller: WalletController;
  let request: any;
  let response: any;

  beforeEach(() => {
    controller = container.resolve(WalletController);
    (controller as any).depositWalletUseCase = {
      deposit: jest.fn().mockReturnValue(1),
    };

    (controller as any).balanceWalletUseCase = {
      getBalanceByEmail: jest.fn().mockReturnValue({}),
    };

    request = {
      loggedUser: { email: "email@email.com" },
    };
    response = {};
    response.json = jest.fn();
    response.status = jest.fn(() => response);
  });

  it("should return 200 and price on method balance", async () => {
    await controller.balance(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({});
  });

  it("should have errors on deposit method due to wrong body format", async () => {
    request.body = {};
    await expect(
      async () => await controller.deposit(request, response),
    ).rejects.toThrow("amount not valid");

    request.body = { amount: "name" };
    await expect(
      async () => await controller.deposit(request, response),
    ).rejects.toThrow("amount not valid");

    expect(
      (controller as any).depositWalletUseCase.deposit,
    ).not.toHaveBeenCalled();
  });

  it("should return status 200 and message on deposit method", async () => {
    request.body = { amount: 1 };
    await controller.deposit(request, response);

    expect(response.json).toHaveBeenCalledWith({
      message: "Deposit added successfully",
    });

    expect(response.status).toHaveBeenCalledWith(200);
  });
});
