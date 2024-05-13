import { container } from "tsyringe";
import { VolumeController } from "../../../src/controller/VolumeController";

describe("VolumeController", () => {
  let controller: VolumeController;
  let request: any;
  let response: any;

  beforeEach(() => {
    controller = container.resolve(VolumeController);
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

  it("should return 200 and extract on method getVolume", async () => {
    await controller.getVolume(request, response);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({});
  });
});
