import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import useImageSearch from "../app/hooks/useImageSearch";
import { mocked } from "jest-mock";
import ToggleButton from "../components/ToggleButton";

// mock the custom hook used in the Grid component
jest.mock("../app/hooks/useImageSearch");
const mockedUseImageSearch = mocked(useImageSearch, true);

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

describe("Grid Component with ToggleButton", () => {
  beforeEach(() => {
    mockedUseImageSearch.mockImplementation(() => ({
      searchText: "",
      setSearchText: jest.fn(),
      images: [],
      nextPage: jest.fn(),
      prevPage: jest.fn(),
      pageNumber: 1,
      loading: false,
      error: "",
      hasNoResults: false,
      selectedColor: "",
      setSelectedColor: jest.fn(),
      sortBy: "latest",
      setPageNumber: jest.fn(),
      fetchImages: jest.fn(),
      setSortBy: jest.fn(),
    }));
  });

  test("changes sort order from relevant to latest", () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <ToggleButton value="relevant" onChange={handleChange} />
    );
    const toggleButton = getByText("relevant");
    fireEvent.click(toggleButton);
    expect(handleChange).toHaveBeenCalledWith("latest");
  });
});
