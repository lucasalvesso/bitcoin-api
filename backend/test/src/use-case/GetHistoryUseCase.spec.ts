import { container } from "tsyringe";
import { GetHistoryUseCase } from "../../../src/use-case/GetHistoryUseCase";

describe("GetHistoryUseCase", () => {
  let service: GetHistoryUseCase;

  beforeEach(() => {
    service = container.resolve(GetHistoryUseCase);
    (service as any).repository = {
      find: jest.fn().mockReturnValue(undefined),
    };
  });

  it("should return ResponseHistoryDto on method execute", async () => {
    (service as any).repository = {
      find: jest.fn().mockReturnValue([]),
    };

    const response = await service.execute();
    expect(response?.history?.length).toBe(144);
    const someResult = response?.history?.pop();
    expect(typeof someResult?.time).toBe("string");
  });
});
