import styled from "styled-components";
import { SearchOptions } from "../api/anilist";
import { AnimeSeason } from "../api/anime";
import { useGetGenresQuery } from "../features/anime/animeAPISlice";

type SearchProps = {
  searchOptions: SearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
};

const SearchPageOptions = ({
  searchOptions,
  setSearchOptions,
}: SearchProps) => {
  const { data: genres } = useGetGenresQuery();

  return (
    <SearchPageOptionsContainer>
      <StyledInputContainer>
        <span>Title</span>
        <StyledInput
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={searchOptions.title}
          onChange={(e) =>
            setSearchOptions((prevOptions) => ({
              ...prevOptions,
              title: e.target.value,
            }))
          }
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <span>Year</span>
        <StyledInput
          type="number"
          name="year"
          id="year"
          placeholder="Year"
          max={new Date().getFullYear()}
          value={searchOptions.year ?? ""}
          onChange={(e) =>
            setSearchOptions((prevOptions) => ({
              ...prevOptions,
              year: parseInt(e.target.value),
            }))
          }
        />
      </StyledInputContainer>
      <StyledInputContainer>
        <span>Season</span>
        <StyledSelect
          name="status"
          id="status"
          onChange={(e) => {
            if (e.target.value === "All") {
              setSearchOptions((prevOptions) => ({
                ...prevOptions,
                season: undefined,
              }));
            } else {
              setSearchOptions((prevOptions) => ({
                ...prevOptions,
                season: AnimeSeason[e.target.value as keyof typeof AnimeSeason],
              }));
            }
          }}
        >
          <option value="All">All</option>
          {Object.keys(AnimeSeason).map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </StyledSelect>
      </StyledInputContainer>
      <StyledInputContainer>
        <span>Genre</span>
        <StyledSelect
          name="genre"
          id="genre"
          onChange={(e) => {
            const val = e.target.value;

            if (val === "All") {
              setSearchOptions((prevOptions) => ({
                ...prevOptions,
                genre: undefined,
              }));
            } else {
              setSearchOptions((prevOptions) => ({
                ...prevOptions,
                genre: val,
              }));
            }
          }}
        >
          <option value="All">All</option>
          {genres &&
            genres.map((genre) => (
              <option key={genre.genre} value={genre.genre}>
                {genre.genre}
              </option>
            ))}
        </StyledSelect>
      </StyledInputContainer>
    </SearchPageOptionsContainer>
  );
};

const SearchPageOptionsContainer = styled.div`
  display: flex;
  gap: 2em;
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  span {
    font-weight: 500;
  }
`;

const StyledInput = styled.input`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  margin-block: 1rem;
`;

const StyledSelect = styled.select`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  margin-block: 1rem;
`;
export default SearchPageOptions;
