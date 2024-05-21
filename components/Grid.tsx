"use client";

import { Search } from "./index";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TColor, filterOptions } from "@/app/types/types";
import Filter from "./Filter";
import ToggleButton from "./ToggleButton";
import useImageSearch from "@/app/hooks/useImageSearch";
import Image from "next/image";

const Grid = () => {
  const router = useRouter();

  const {
    searchText,
    setSearchText,
    images,
    nextPage,
    prevPage,
    pageNumber,
    loading,
    error,
    hasNoResults,
    selectedColor,
    setSelectedColor,
    sortBy,
    setPageNumber,
    fetchImages,
    setSortBy,
  } = useImageSearch();

  useEffect(() => {
    console.log(images);
  }, [images]);

  console.log(searchText, "searchtex");

  const handleFilterChange = (color: TColor) => {
    setSelectedColor(color);
    router.push(
      `?searchText=${searchText}&sortBy=${sortBy}&color=${color}&page=${pageNumber}`
    );
  };

  const handleNavigateImageDetail = (imageId: string) => {
    router.push(
      `detail/${imageId}?&sortBy=${sortBy}&color=${selectedColor}&page=${pageNumber}`
    );
  };

  const handleSetSortBy = (sorting: string) => {
    if (sorting === "") {
      setSortBy("relevant");
    } else {
      setSortBy(sorting);
    }
    router.push(
      `?searchText=${searchText}&sortBy=${sorting}&color=${selectedColor}&page=${pageNumber}`
    );
  };

  return (
    <section className="xl:flex-row flex-col flex justify-center">
      <div className="xl:w-8/12 w-11/12 xl:my-40 mt-10 md:mt-40 flex flex-col gap-6">
        <Search
          fetchImages={fetchImages}
          setSearchText={setSearchText}
          searchText={searchText}
          sortBy={sortBy}
          selectedColor={selectedColor}
          pageNumber={pageNumber}
        />
        <Filter
          setPageNumber={setPageNumber}
          color={selectedColor}
          filterOptions={filterOptions}
          handleFilterChange={handleFilterChange}
        />

        <div className="flex flex-row space-x-4">
          <ToggleButton value={sortBy} onChange={handleSetSortBy} />
        </div>

        <div className="flex flex-col space-y-4 p-2">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : hasNoResults ? (
            <p className="text-center">No results found...</p>
          ) : images ? (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {images.map((img: any) => (
                <div
                  onClick={() => handleNavigateImageDetail(img.id)}
                  key={img.id}
                  className="h-auto max-w-full rounded-lg text-grey p-3 bg-zinc-300"
                >
                  <Image
                    width={150}
                    height={150}
                    className="h-auto max-w-full object-fit rounded-lg mb-2"
                    src={img.urls.small}
                    alt={img.alt_description}
                  />
                  <p className="text-xs italic">{img.alt_description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>

        {images ? (
          <div className="flex flex-row justify-between space-x-4">
            <button
              className={`w-[50] px-2 rounded-sm py-3 font-medium text-white shadow ${
                pageNumber === 1
                  ? "bg-zinc-300 cursor-not-allowed"
                  : "bg-activeButton"
              }`}
              onClick={prevPage}
              disabled={pageNumber === 1}
            >
              Previous
            </button>
            <button
              className={`w-[50] px-2 rounded-sm py-3 font-medium text-white shadow ${
                images.length < 10
                  ? "bg-zinc-300 cursor-not-allowed"
                  : "bg-activeButton"
              }`}
              onClick={nextPage}
              disabled={(images?.length ?? 0) < 10}
            >
              Next
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Grid;
