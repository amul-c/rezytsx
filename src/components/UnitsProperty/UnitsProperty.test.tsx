import { render, waitFor, screen } from "@testing-library/react";
import UnitsProperty from "./UnitsProperty";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useSelectorMock } from "../UnitsProperty/mockRedux";

jest.mock("axios");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => useSelectorMock(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

const findByText = (
  text: string,
  container: ParentNode = document.body
): Element | null => {
  const hasText = (element: Element) => element.textContent?.includes(text);
  const elementContainsText: any = (element: Element) =>
    hasText(element) ||
    Array.from(element.children).some((child) =>
      elementContainsText(child as Element)
    );
  const foundElement = Array.from(container.querySelectorAll("*")).find(
    (element) => elementContainsText(element)
  );
  return foundElement || null;
};

describe("UnitsProperty component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders component with fetched data", async () => {
    const testData = [
      {
        id: 1,
        name: "1",
        reading: "25",
        tenantName: "John Doe",
      },
    ];
    useSelectorMock.mockReturnValueOnce({
      screenSize: {
        isSmallScreen: false,
        isLargeScreen: true,
      },
    });
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: testData,
    });
    render(
      <MemoryRouter initialEntries={["/property/1"]}>
        <Routes>
          <Route path="/property/:propertyId" element={<UnitsProperty />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    await waitFor(() => {
      expect(screen.queryByTestId("sort-select")).not.toBeInTheDocument();
      expect(findByText("1")).toBeInTheDocument();
      expect(findByText("1")).toBeInTheDocument();
      expect(findByText("John Doe")).toBeInTheDocument();
    });
  });
});
