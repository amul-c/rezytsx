import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import KPI from "./KPI";

jest.mock("axios");

const mockStore = configureStore([]);
const initialState = {};
const store = mockStore(initialState);

describe("KPI", () => {
  it("renders and calls API", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(
      <Provider store={store}>
        <Router>
          <KPI propertyId="1" />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/kpi/property/1`
      );
    });
  });

  it("fetches and displays data", async () => {
    const testData = [
      {
        KPI: "Test KPI",
        T3: "Test T3",
        TGT: "Test TGT",
        PROJECTION: "Test Projection",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: testData });

    render(
      <Provider store={store}>
        <Router>
          <KPI propertyId="1" />
        </Router>
      </Provider>
    );
  });
});
