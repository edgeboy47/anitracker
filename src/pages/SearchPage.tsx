import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { SearchOptions } from "../api/anilist";
import { AnimeSeason } from "../api/anime";
import { useAppDispatch, useDebounce } from "../app/hooks";
import AnimeList from "../components/AnimeList";
import SearchPageOptions from "../components/SearchPageOptions";
import { searchAnime, selectSearch } from "../features/anime/animeSlice";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    title: searchParams.get("title") || "",
  });
  const debouncedSearchOptions = useDebounce<SearchOptions>(searchOptions);

  const dispatch = useAppDispatch();

  // Update search params whenever search options change, uses debounce
  useEffect(() => {
    // If any of the values are not null
    if (Object.values(debouncedSearchOptions).some((value) => value)) {
      setSearchParams(
        Object.entries(debouncedSearchOptions)
          .filter(([, value]) => value)
          .map(([key, value]) => {
            return [key, value.toString()] as [string, string];
          })
      );
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchOptions, setSearchParams]);

  // Check search params on mount, and dispatch search if any exist
  // Also runs whenever search params are updated
  useEffect(() => {
    // if (searchParams.has("title")) {
    //   const title = searchParams.get("title");
    //   dispatch(searchAnime(title!));
    // } else {
    //   dispatch(searchAnime(""));
    // }
    let options: SearchOptions = {};

    for (const [key, value] of searchParams.entries()) {
      // TODO find a way to programmatically set options from search params
      switch (key) {
        case "title":
          options.title = value;
          break;

        case "year":
          options.year = parseInt(value);
          break;

        case "season":
          options.season = value as AnimeSeason;
          break;
        
        default:
          break;
      }
    }

    dispatch(searchAnime(options));
  }, [searchParams, dispatch]);

  return (
    <div>
      <SearchPageOptions
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
      />
      <SearchResults />
    </div>
  );
};

export default SearchPage;


const SearchResults = () => {
  const searchResults = useSelector(selectSearch);
  
  return (
    // TODO add pagination
    <div>
      {searchResults && searchResults?.length > 0 ? (
        <AnimeList animeList={searchResults} />
      ) : (
        "No Results found"
      )}
    </div>
  );
};
