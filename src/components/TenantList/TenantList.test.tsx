import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import TenantList from "../TenantList/TenantList";
import { MemoryRouter } from "react-router-dom";
jest.mock("axios");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn().mockReturnValue({
    pathname: "/mock-path",
  }),
}));

describe("TenantList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders component with data", async () => {
    const testData = [
      {
        id: 1,
        name: "John Doe",
        role: "Manager",
        joined: "2022-01-01",
        phone: "1234567890",
        email: "john@example.com",
        unitCount: 1,
      },
    ];
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: testData,
    } as AxiosResponse<any>);
    render(
      <MemoryRouter>
        <TenantList />
      </MemoryRouter>
    );

    await waitFor(() => {});

    expect(screen.getByText("NAME")).toBeInTheDocument();
    expect(screen.getByText("ROLE")).toBeInTheDocument();
    expect(screen.getByText("JOINED")).toBeInTheDocument();
    expect(screen.getByText("PHONE")).toBeInTheDocument();
    expect(screen.getByText("EMAIL")).toBeInTheDocument();
    expect(screen.getByText("PROPERTY")).toBeInTheDocument();
    expect(screen.getByText("ACTION")).toBeInTheDocument();

    testData.forEach(({ name, role, joined, phone, email }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(role)).toBeInTheDocument();
      expect(screen.getByText(joined)).toBeInTheDocument();
      expect(screen.getByText(phone)).toBeInTheDocument();
      expect(screen.getByText(email)).toBeInTheDocument();
    });
  });

  test("handles deletion of tenant", async () => {
    // Mock data
    const testData = [
      {
        id: 1,
        name: "John Doe",
        role: "Manager",
        joined: "2022-01-01",
        phone: "1234567890",
        email: "john@example.com",
        unitCount: 1,
      },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: testData,
    } as AxiosResponse<any>);
    render(<TenantList />);

    await waitFor(() => {});

    (
      axios.delete as jest.MockedFunction<typeof axios.delete>
    ).mockResolvedValueOnce({});

    await waitFor(() => {
      expect(screen.getByAltText("Delete")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByAltText("Delete"));
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:8080/tenant/1"
      );
    });
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
