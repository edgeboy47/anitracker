import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchOptions } from "../api/anilist";
import { AnimeSeason } from "../api/anime";
import { useDebounce } from "../app/hooks";
import AnimeList from "../components/AnimeList";
import SearchPageOptions from "../components/SearchPageOptions";
import { useSearchAnimeQuery } from "../features/anime/animeAPISlice";

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
      <SearchResults />
    </div>
  );
};

export default SearchPage;

const SearchResults = () => {
  // TODO switch over to rtk query

  const [searchParams] = useSearchParams();
  const [searchOptions, setsearchOptions] = useState<SearchOptions>({});
  const { data: searchResults } = useSearchAnimeQuery(searchOptions);

  // Whenever search params change, send a query with the current options
  useEffect(() => {

    const options: SearchOptions = {};

    for (const [key, value] of searchParams.entries()) {
      // TODO find a way to programmatically set options from search params
      switch (key) {
        case "title":
          options.title = value;
          break;

        case "year":
          options.year = parseInt(value as string);
          break;

        case "season":
          options.season = value as AnimeSeason;
          break;

        default:
          break;
      }
    }

    setsearchOptions(options);
  }, [searchParams]);

  return (
    // TODO add pagination
    <div>
      {searchResults && searchResults.Page.media?.length > 0 ? (
        <AnimeList animeList={searchResults.Page.media} />
      ) : (
        "No Results found"
      )}
    </div>
  );
};
