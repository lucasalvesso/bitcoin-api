import { container } from "tsyringe";
import { BalanceWalletUseCase } from "../../../src/use-case/BalanceWalletUseCase";

describe("BalanceWalletUseCase", () => {
  let service: BalanceWalletUseCase;

  beforeEach(() => {
    service = container.resolve(BalanceWalletUseCase);
    (service as any).repository = {
      getByEmail: jest.fn().mockReturnValue(undefined),
    };
  });

  it("should get error due to cant find account on method getBalanceByEmail", async () => {
    await expect(
      async () => await service.getBalanceByEmail(""),
    ).rejects.toThrow("Account does not exists");
  });

  it("should return ResponseBalanceDto on method getBalanceByEmail", async () => {
    (service as any).repository = {
      getByEmail: jest.fn().mockReturnValue({
        email: "email@email.com",
        name: "name",
        wallet: { balance: 1 },
      }),
    };

    const response = await service.getBalanceByEmail("");
    expect(response).toEqual(
      expect.objectContaining({
        email: "email@email.com",
        name: "name",
        balance: 1,
      }),
    );
  });
});
