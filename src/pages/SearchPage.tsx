import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppDispatch } from "../app/store";
import AnimeList from "../components/AnimeList";
import { searchAnime, selectSearch } from "../features/anime/animeSlice";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("");

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

  // TODO get search options from query params
  const debouncedSearch = useCallback(
    debounce((title: string) => {
      // dispatch
      console.log(title);
      dispatch(searchAnime(title));
    }),
    []
  );

  useEffect(() => {
    debouncedSearch(title);
  }, [debouncedSearch, title]);

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

  return <div>{searchResults && <AnimeList animeList={searchResults} />}</div>;
};
