import { container } from "tsyringe";
import { ExtractController } from "../../../src/controller/ExtractController";

describe("ExtractController", () => {
  let controller: ExtractController;
  let request: any;
  let response: any;

  beforeEach(() => {
    controller = container.resolve(ExtractController);
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

  it("should return 200 and extract on method getExtract", async () => {
    await controller.getExtract(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({});
  });
});
