import { TColor } from "@/app/types/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

type FilterProps = {
  filterOptions: string[];
  color: TColor;
  handleFilterChange: (value: TColor) => void;
  setPageNumber: (value: number) => void;
};

const Filter: React.FC<FilterProps> = ({
  filterOptions,
  handleFilterChange,
  color,
  setPageNumber,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const _searchText = searchParams.get("searchText");
  const _sortBy = searchParams.get("sortBy") as string | null;
  const _color = searchParams.get("color") as TColor;

  const handlerFilterByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilterChange(e.target.value as TColor);
    setPageNumber(1);
    router.push(
      `?searchText=${_searchText}&sortBy=${_sortBy}&color=${
        e.target.value
      }&page=${1}`
    );
  };

  return (
    <div className="flex flex-row space-x-4">
      <select value={color || ""} onChange={handlerFilterByChange}>
        <option value="" disabled>
          Select a color
        </option>
        {filterOptions.map((option, index) => (
          <option key={index} value={option}>
            Filter by {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
