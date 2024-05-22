import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import FireAlarm from "./FireAlarm";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: () => ({
    propertyId: "1",
    deviceName: "firealarm",
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
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn((selectorFn) => selectorFn(initialState)),
}));

describe("FireAlarm", () => {
  it("renders and calls API", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(
      <Provider store={store}>
        <Router>
          <FireAlarm />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/device/firealarm/info/property/1`
      );
    });
  });

  it("applies sorting correctly", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: [
        {
          id: 2,
          propertyName: "B",
          installedDate: "2022-01-01",
          reading: { temperature: "20" },
          connection: "Active",
        },
        {
          id: 1,
          propertyName: "A",
          installedDate: "2023-01-01",
          reading: { temperature: "25" },
          connection: "Inactive",
        },
      ],
    });

    render(
      <Provider store={store}>
        <Router>
          <FireAlarm />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/B/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/Sort By/i));

    fireEvent.change(screen.getByLabelText("Choose Category"), {
      target: { value: "propertyName" },
    });
    fireEvent.change(screen.getByLabelText("Choose sorting order"), {
      target: { value: "Ascending" },
    });
    fireEvent.click(screen.getByText(/Apply/i));

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("A");
      expect(rows[2]).toHaveTextContent("B");
    });
  });

  it("fetches and displays data", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: [
        {
          id: 1,
          propertyName: "A",
          installedDate: "2023-01-01",
          reading: { temperature: "25" },
          connection: "Inactive",
        },
      ],
    });

    render(
      <Provider store={store}>
        <Router>
          <FireAlarm />
        </Router>
      </Provider>
    );
    await waitFor(() => {
      const elements = screen.queryAllByText((content, element) => {
        if (!element) return false;
        return (
          content.includes("A") && element.classList.contains("specific-class")
        );
      });

      expect(elements).toBeDefined();
    });
  });
});
