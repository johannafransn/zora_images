import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../app/page";
import React from "react";
import Grid from "../components/Grid";
import Search from "../components/Search";

//for now just mock the navigation
jest.mock("next/navigation", () => ({
  ...require("next-router-mock"),
  useSearchParams: () => ({
    get: jest.fn(),
    set: jest.fn(),
  }),
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

describe("Home", () => {
  it("renders a heading 'Browse & Explore' on home page", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});

describe("Grid", () => {
  test("renders Grid component", () => {
    render(<Grid />);
    const gridElement = screen.getByTestId("grid-component");
    expect(gridElement).not.toBeNull();
  });

  test("displays relevant sort by on toggle", () => {
    render(<Grid />);
    const loadingElement = screen.getByText("relevant");
    expect(loadingElement).not.toBeNull();
  });
});

describe("Search", () => {
  const mockSetSearchText = jest.fn();
  const mockFetchImages = jest.fn();

  beforeEach(() => {
    render(
      <Search
        setSearchText={mockSetSearchText}
        searchText=""
        fetchImages={mockFetchImages}
        sortBy="date"
        selectedColor="red"
        pageNumber={1}
      />
    );
  });

  test("renders search input and button", () => {
    const inputElement = screen.getByPlaceholderText(
      "Search by image keyword..."
    );
    const buttonElement = screen.getByTestId("search");
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test("allows typing in search input", () => {
    const inputElement = screen.getByPlaceholderText(
      "Search by image keyword..."
    );
    fireEvent.change(inputElement, { target: { value: "nature" } });
    expect(mockSetSearchText).toHaveBeenCalledWith("nature");
  });

  test("calls fetchImages and handleRouting on button click", () => {
    const buttonElement = screen.getByTestId("search");
    fireEvent.click(buttonElement);
    expect(mockFetchImages).toHaveBeenCalled();
  });
});
