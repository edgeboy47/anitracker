import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { SearchOptions } from "../api/anilist";
import Anime from "../api/anime";
import { useLazySearchAnimeQuery } from "../features/anime/animeAPISlice";
import { AppDispatch } from "./store";

// Found on usehooks.com
// T is a generic type for value parameter, our case this will be string
export function useDebounce<T>(value: T, delay: number = 500): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook to allow infinite scrolling on the search page
// Takes the number of total pages, and the search options
// Returns an array of all the Anime, from pages 1 to N
export const useInfiniteSearchAnimeQuery = (options: SearchOptions) => {
  const shouldReset = useRef(true);
  const [results, setResults] = useState<Anime[]>([]);
  const [trigger, result] = useLazySearchAnimeQuery();

  // Whenever options changes, rerun the query from the first page
  useEffect(() => {
    console.log("in trigger useeffect");
    shouldReset.current = true;
    trigger({ ...options, page: 1 });
  }, [options, trigger]);

  // Whenever result changes due to running trigger, append data to results array
  useEffect(() => {
    console.log("in result useeffect");
    if (result.isFetching || result.isSuccess === false) return;

    // IF shouldReset is true due to changing options, reset the results array
    if (shouldReset.current) {
      setResults(result.data.Page.media);
      shouldReset.current = false
    } else {
      setResults((prev) => [...new Set(prev.concat(...result.data.Page.media))]);
    }
  }, [result.data, result.isSuccess, result.isFetching]);

  return {
    ...result,
    data: results,
    fetchNextPage() {
      console.error('fetchnextpage run')
      if (result.data?.Page.pageInfo.hasNextPage)
        trigger({
          ...options,
          page: result.data.Page.pageInfo.currentPage + 1,
        });
    },
  };
};
