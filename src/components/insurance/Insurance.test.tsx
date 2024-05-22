import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Insurance from "./Insurance";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("Insurance", () => {
  it("renders and calls API", async () => {
    const mockData = [
      {
        averageOccupancy: 0.85,
        eviction: 10,
        unregisteredVehicle: 5,
        vacantAlert: 2,
        curfewActivity: 3,
      },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(
      <Router>
        <Insurance propertyId="1" />
      </Router>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/insurance/property/1`
      );
    });
    expect(screen.getByText(/Insurance Index/i)).toBeInTheDocument();
    expect(screen.getByText(/Average Occupancy/i)).toBeInTheDocument();
    expect(screen.getByText(/Eviction/i)).toBeInTheDocument();
    expect(screen.getByText(/Unregistered Vehicle/i)).toBeInTheDocument();
    expect(screen.getByText(/Vacant Alerts/i)).toBeInTheDocument();
    expect(screen.getByText(/Curfew Activity/i)).toBeInTheDocument();
  });
});
