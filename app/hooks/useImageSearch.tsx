import { useEffect, useState } from "react";
import ApiService from "../ApiService";
import { TColor } from "../types/types";
import { useRouter, useSearchParams } from "next/navigation";

const useImageSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [images, setImages] = useState<any[] | null>(null);
  const [selectedColor, setSelectedColor] = useState<TColor>("");
  const [sortBy, setSortBy] = useState("relevant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const _searchText = searchParams.get("searchText");
  const _sortBy = searchParams.get("sortBy") as string | null;
  const _color = searchParams.get("color") as TColor;
  const _page = searchParams.get("page") as string | null;

  // set present url values on mount
  useEffect(() => {
    if (_searchText) setSearchText(_searchText);
    if (_page) setPageNumber(Number(_page));
    if (_color) setSelectedColor(_color);
    if (_sortBy) setSortBy(_sortBy);
  }, [_searchText]);

  useEffect(() => {
    if (searchText) {
      fetchImages();
    } else {
      setError("Please provide a searchtext...");
    }
  }, [pageNumber, selectedColor, sortBy]);

  const fetchImages = async () => {
    if (!searchText || loading) return; //dont fetch with empty text or when loading
    setLoading(true);
    setError("");
    try {
      const _images = await ApiService.getImagesData(
        pageNumber,
        searchText,
        selectedColor,
        sortBy
      );
      setImages(_images);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch images");
      setLoading(false);
    }
  };

  const nextPage = () => {
    setPageNumber((prev) => prev + 1);
    router.push(
      `?searchText=${searchText}&sortBy=${sortBy}&color=${selectedColor}&page=${
        pageNumber + 1
      }`
    );
  };
  const prevPage = () => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : 1));
    router.push(
      `?searchText=${searchText}&sortBy=${sortBy}&color=${selectedColor}&page=${
        pageNumber > 1 ? pageNumber - 1 : 1
      }`
    );
  };

  const hasNoResults = images && images.length === 0 && searchText !== "";

  return {
    searchText,
    setSearchText,
    images,
    nextPage,
    prevPage,
    pageNumber,
    loading,
    error,
    fetchImages,
    hasNoResults,
    selectedColor,
    setSelectedColor,
    sortBy,
    setSortBy,
    setPageNumber,
  };
};

export default useImageSearch;
