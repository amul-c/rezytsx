import { render, waitFor } from "@testing-library/react";
import BuildingUnits from "./BuildingUnits";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    buildingId: "1",
  }),
}));

const mockStore = configureStore([]);
const initialState = {
  screenSize: {
    isSmallScreen: false,
    isLargeScreen: true,
  },
};
const store = mockStore(initialState);

describe("BuildingUnits", () => {
  it("renders and calls API", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(
      <Provider store={store}>
        <Router>
          <BuildingUnits />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/unit/building/1/list`
      );
    });
  });
});
