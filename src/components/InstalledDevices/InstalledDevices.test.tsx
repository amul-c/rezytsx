import { render, screen, waitFor } from "@testing-library/react";
import InstalledDevices from "./InstalledDevices";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
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

describe("InstalledDevices", () => {
  it("renders and calls API", async () => {
    const propertyId = "1";
    const mockData = [
      {
        device_type: "fire",
        count: 2,
        icon: "fire.png",
      },
      {
        device_type: "cosensor",
        count: 3,
        icon: "cosensor.png",
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(
      <Provider store={store}>
        <Router>
          <InstalledDevices propertyId={propertyId} />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/device/installed-devices/property/${propertyId}`
      );
    });

    const fireDevice = screen.getByText("fire");
    const cosensorDevice = screen.getByText("cosensor");
    expect(fireDevice).toBeInTheDocument();
    expect(cosensorDevice).toBeInTheDocument();
  });
});
