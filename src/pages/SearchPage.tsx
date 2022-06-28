import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { SearchOptions } from "../api/anilist";
import { useAppDispatch, useDebounce } from "../app/hooks";
import SearchPageOptions from "../components/SearchPageOptions";
import { SearchPageResults } from "../components/SearchPageResults";
import { selectUser } from "../features/auth/authSlice";
import {
  getUserWatchList,
  selectWatchList,
} from "../features/watchlist/watchlistSlice";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchOptions, setSearchOptions] = useState<SearchOptions>({
    title: searchParams.get("title") || "",
  });
  const user = useSelector(selectUser);
  const watchlist = useSelector(selectWatchList);
  const dispatch = useAppDispatch();
  const debouncedSearchOptions = useDebounce<SearchOptions>(searchOptions);

  // Fetch user's watchlist if they are logged in and it has not already been fetched
  useEffect(() => {
    if (user && watchlist === null) {
      console.log("fetching user watchlist");
      dispatch(getUserWatchList(user.uid));
    }
  }, [dispatch, user, watchlist]);

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
