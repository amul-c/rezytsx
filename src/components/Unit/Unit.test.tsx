import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelectorMock } from "../Unit/mockRedux";
jest.mock("axios");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => useSelectorMock(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.setTimeout(30000);

describe("my-test", () => {
  it("my test description", async () => {
    try {
      jest.clearAllMocks();
      (useParams as jest.Mock).mockReturnValue({
        unitId: "1",
        buildingId: "2",
      });

      const testData = {
        sensors: [{ id: 1, name: "Sensor 1" }],
        unitInfo: { id: 1, name: "Unit 1", devices: ["Device 1"] },
        waterUsage: { usage: "100L" },
      };

      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockResolvedValueOnce({ data: testData });
      (
        axios.get as jest.MockedFunction<typeof axios.get>
      ).mockRejectedValueOnce(new Error("Failed to fetch data"));
    } catch (e: any) {
      console.log("EXCEPTION", e.message);
    }
  });
});
