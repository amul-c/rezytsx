import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { useSelectorMock } from "../PropertyInfo/mockRedux";
import PropertyInfo from "./PropertyInfo";
jest.mock("axios");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => useSelectorMock(),
}));

describe("PropertyInfo component", () => {
  beforeEach(() => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: {
        buildingCount: 5,
        unitCount: 10,
        occupancy: "Occupied",
        owner: "John Doe",
        phone: "123-456-7890",
        email: "john@example.com",
        tenantCount: 20,
      },
    });
  });

  it("renders the PropertyInfo component with correct data", async () => {
    render(
      <MemoryRouter>
        <PropertyInfo propertyId="123" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Number of Buildings")).toBeInTheDocument();
      expect(screen.getByText("5")).toBeInTheDocument();
    });
  });
});
