import "text-encoding-utf-8";
import { render } from "@testing-library/react";
import ActiveAlerts from "./ActiveAlerts";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
jest.mock("axios");
const mockStore = configureStore([]);
const initialState = {
  alerts: [],
  screenSize: {
    isLargeScreen: true,
  },
};
const store = mockStore(initialState);

test("renders active alerts and calls API", async () => {
  (axios.get as jest.Mock).mockResolvedValueOnce({ data: [] });

  render(
    <Provider store={store}>
      <ActiveAlerts propertyId="1" />
    </Provider>
  );
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(
    `http://localhost:8080/device/active-alert/property/1`
  );
});
