import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppDispatch } from "../app/store";
import AnimeList from "../components/AnimeList";
import { searchAnime, selectSearch } from "../features/anime/animeSlice";

// const useDebounce
const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get('title') || "");

  const dispatch = useDispatch<AppDispatch>();

  const debounce = (fn: Function, delay: number = 1000) => {
    let timer: number;

    return (...args: any[]) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((title: string) => {
      // dispatch
      title.length > 0
        ? setSearchParams({ title: title })
        : setSearchParams({});

      dispatch(searchAnime(title));
    }),
    []
  );

  // Check search params on mount, and dispatch search if any exist
  // Also runs whenever search params are updated
  useEffect(() => {
    console.log('in onmount useeffect')
    if (searchParams.has("title")) {
      const title = searchParams.get("title");
      debouncedSearch(title!);
    }
  }, [debouncedSearch, searchParams]);


  // Update search params whenever title changes
  // TODO debounce search param updates
  // TODO fix bug when going from home page to search page via searchbar, then deleting title field one by one
  useEffect(() => {
    console.log('in title useeffect')
    if (title.length > 0) {
      setSearchParams({ title: title });
    } else {
      searchParams.delete('title')
      setSearchParams(searchParams);
    }
  }, [title, setSearchParams, searchParams]);

  return (
    <div>
      <SearchPageOptions value={title} onChange={setTitle} />
      <SearchResults />
    </div>
  );
};

export default SearchPage;

type SearchProps = {
  value: string;
  onChange: Function;
};

const SearchPageOptions = ({ value, onChange }: SearchProps) => {
  return (
    <div>
      <div>
        <span>Title</span>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

const SearchResults = () => {
  const searchResults = useSelector(selectSearch);

  return (
    <div>
      {searchResults && searchResults?.length > 0 ? (
        <AnimeList animeList={searchResults} />
      ) : (
        "No Results found"
      )}
    </div>
  );
};
