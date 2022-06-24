import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchOptions } from "../api/anilist";
import { useDebounce } from "../app/hooks";
import SearchPageOptions from "../components/SearchPageOptions";
import { SearchPageResults } from "../components/SearchPageResults";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    title: searchParams.get("title") || "",
  });

  const debouncedSearchOptions = useDebounce<SearchOptions>(searchOptions);

  // Update search params whenever search options change, uses debounce
  useEffect(() => {
    // If any of the values are not null
    if (Object.values(debouncedSearchOptions).some((value) => value)) {
      setSearchParams(
        Object.entries(debouncedSearchOptions)
          .filter(([, value]) => value)
          .map(([key, value]) => {
            return [key, value as string] as [string, string];
          })
      );
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchOptions, setSearchParams]);

  return (
    <div>
      <SearchPageOptions
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
      />
      <SearchPageResults />
    </div>
  );
};

export default SearchPage;

