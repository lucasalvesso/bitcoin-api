import { container } from "tsyringe";
import { BitcoinController } from "../../../src/controller/BitcoinController";

describe("BitcoinController", () => {
  let controller: BitcoinController;
  let request: any;
  let response: any;

  beforeEach(() => {
    controller = container.resolve(BitcoinController);
    (controller as any).getBitcoinPriceUseCase = {
      execute: jest.fn().mockReturnValue(1),
    };

    (controller as any).sellBitcoinUseCase = {
      execute: jest.fn(),
    };

    (controller as any).buyBitcoinUseCase = {
      execute: jest.fn(),
    };

    request = {
      loggedUser: { email: "" },
    };
    response = {};
    response.json = jest.fn();
    response.status = jest.fn(() => response);
  });

  it("should return 200 and price on method getPrice", async () => {
    await controller.getPrice(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(1);
  });

  it("should have errors on sellBitcoin method due to wrong body format", async () => {
    request.body = {};
    await expect(
      async () => await controller.sellBitcoin(request, response),
    ).rejects.toThrow("amount not valid");

    request.body = { amount: "name" };
    await expect(
      async () => await controller.sellBitcoin(request, response),
    ).rejects.toThrow("amount not valid");

    expect(
      (controller as any).sellBitcoinUseCase.execute,
    ).not.toHaveBeenCalled();
  });

  it("should return status 200 and message on sellBitcoin method", async () => {
    request.body = { amount: 1 };
    await controller.sellBitcoin(request, response);

    expect(response.json).toHaveBeenCalledWith({
      message: "Bitcoin sold successfully",
    });

    expect(response.status).toHaveBeenCalledWith(200);
  });

  it("should have errors on buyBitcoin method due to wrong body format", async () => {
    request.body = {};
    await expect(
      async () => await controller.buyBitcoin(request, response),
    ).rejects.toThrow("amount not valid");

    request.body = { amount: "name" };
    await expect(
      async () => await controller.buyBitcoin(request, response),
    ).rejects.toThrow("amount not valid");

    expect(
      (controller as any).buyBitcoinUseCase.execute,
    ).not.toHaveBeenCalled();
  });

  it("should return status 200 and message on buyBitcoin method", async () => {
    request.body = { amount: 1 };
    await controller.buyBitcoin(request, response);

    expect(response.json).toHaveBeenCalledWith({
      message: "Bitcoin bought successfully",
    });

    expect(response.status).toHaveBeenCalledWith(200);
  });
});
