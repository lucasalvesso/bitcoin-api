import { container } from "tsyringe";
import { HistoryController } from "../../../src/controller/HistoryController";

describe("HistoryController", () => {
  let controller: HistoryController;
  let request: any;
  let response: any;

  beforeEach(() => {
    controller = container.resolve(HistoryController);
    (controller as any).useCase = {
      execute: jest.fn().mockReturnValue({}),
    };

    request = {
      loggedUser: { email: "email@email.com" },
      query: {},
    };
    response = {};
    response.json = jest.fn();
    response.status = jest.fn(() => response);
  });

  it("should return 200 and extract on method getHistory", async () => {
    await controller.getHistory(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({});
  });
});
