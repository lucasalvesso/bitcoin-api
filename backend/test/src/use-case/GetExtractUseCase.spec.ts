import { container } from "tsyringe";
import { GetExtractUseCase } from "../../../src/use-case/GetExtractUseCase";
import { QueryGetExtractDto } from "../../../src/dto/QueryGetExtractDto";

describe("GetExtractUseCase", () => {
  let service: GetExtractUseCase;

  beforeEach(() => {
    service = container.resolve(GetExtractUseCase);
    (service as any).repository = {
      getExtract: jest.fn().mockReturnValue(undefined),
    };
  });

  it("should return ResponseExtractDto on method execute", async () => {
    (service as any).repository = {
      getExtract: jest.fn().mockReturnValue({
        email: "email@email.com",
        name: "name",
        wallet: {
          bitcoinWallet: { buyTransactions: [], sellTransactions: [] },
          transactions: [],
        },
      }),
    };

    const response = await service.execute({} as QueryGetExtractDto);
    expect(response).toEqual(
      expect.objectContaining({
        email: "email@email.com",
        name: "name",
        operations: [],
      }),
    );
  });
});
