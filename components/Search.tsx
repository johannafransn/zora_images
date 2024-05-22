"use client";
import React from "react";
import { TColor } from "../app/types/types";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

type SearchProps = {
  setSearchText: (txt: string) => void;
  searchText: string;
  fetchImages: () => Promise<void>;
  sortBy: string;
  selectedColor: TColor;
  pageNumber: number;
};
export const Search = (props: SearchProps) => {
  const {
    searchText,
    setSearchText,
    fetchImages,
    sortBy,
    selectedColor,
    pageNumber,
  } = props;
  const router = useRouter();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchInputKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      await fetchImages();
      handleRouting();
    }
  };

  const handleRouting = () => {
    router.push(
      `?searchText=${searchText}&sortBy=${sortBy}&color=${selectedColor}&page=${pageNumber}`
    );
  };

  return (
    <div className="relative flex flex-col space-y-4">
      <div className="min-w-0 flex-1">
        <label htmlFor="email" className="sr-only">
          Search
        </label>
        <input
          type="text"
          onKeyDown={handleSearchInputKeyPress}
          placeholder="Search by image keyword..."
          value={searchText}
          onChange={(e) => handleSearch(e)}
          className="form-control block w-full rounded-sm bg-gray px-4 py-5 text-base text-black placeholder-gray-500 focus:outline-none"
        />
      </div>
      <div className="mt-1 ml-2 sm:mt-3 sm:ml-3 flex-1 sm:flex-auto w-full sm:w-auto">
        <button
          data-testid="search"
          onClick={async () => {
            await fetchImages();
            handleRouting();
          }}
          className="relative sm:absolute right-2 sm:top-2 w-full sm:w-auto block  rounded-sm bg-activeButton py-3 px-4 font-medium text-white shadow hover:bg-activeButton disabled:cursor-not-allowed"
          disabled={false}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
