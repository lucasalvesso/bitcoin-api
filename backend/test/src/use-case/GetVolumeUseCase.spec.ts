import { container } from "tsyringe";
import { GetVolumeUseCase } from "../../../src/use-case/GetVolumeUseCase";

describe("GetVolumeUseCase", () => {
  let service: GetVolumeUseCase;

  beforeEach(() => {
    service = container.resolve(GetVolumeUseCase);
    (service as any).sellTransactionBitcoinRepository = {
      find: jest.fn().mockReturnValue([]),
    };

    (service as any).buyTransactionBitcoinRepository = {
      find: jest.fn().mockReturnValue([]),
    };
  });

  it("should return ResponseVolumeTodayDto on method execute", async () => {
    (service as any).sellTransactionBitcoinRepository = {
      find: jest.fn().mockReturnValue([{ amount: 1 }]),
    };

    (service as any).buyTransactionBitcoinRepository = {
      find: jest.fn().mockReturnValue([{ amount: 1 }]),
    };

    const response = await service.execute();
    expect(response).toEqual(
      expect.objectContaining({
        buy: 1,
        sell: 1,
      }),
    );
  });
});
