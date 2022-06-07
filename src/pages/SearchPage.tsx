import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useDebounce } from "../app/hooks";
import AnimeList from "../components/AnimeList";
import { searchAnime, selectSearch } from "../features/anime/animeSlice";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const debouncedTitle = useDebounce<string>(title);

  const dispatch = useAppDispatch();

  // Update search params whenever title changes, uses debounce
  useEffect(() => {
    if (debouncedTitle.length > 0) {
      setSearchParams({ title: debouncedTitle });
    } else {
      setSearchParams({});
    }
  }, [debouncedTitle, setSearchParams]);

  // Check search params on mount, and dispatch search if any exist
  // Also runs whenever search params are updated
  useEffect(() => {
    if (searchParams.has("title")) {
      const title = searchParams.get("title");
      dispatch(searchAnime(title!));
    } else {
      dispatch(searchAnime(""));
    }
  }, [searchParams, dispatch]);

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
        <StyledInput
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

const StyledInput = styled.input`
  background: #eff1f7;
  border-radius: 8px;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  margin: 1rem;
`;

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
