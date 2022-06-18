import styled from "styled-components";
import { SearchOptions } from "../api/anilist";
import { AnimeSeason } from "../api/anime";

type SearchProps = {
  searchOptions: SearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
};

const SearchPageOptions = ({
  searchOptions,
  setSearchOptions,
}: SearchProps) => {
  return (
    <SearchPageOptionsContainer>
      <div>
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
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
    </SearchPageOptionsContainer>
  );
};

const SearchPageOptionsContainer = styled.div`
  display: flex;
`;

const StyledInput = styled.input`
  background: #eff1f7;
  border-radius: 8px;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  margin: 1rem;
`;

const StyledSelect = styled.select`
  background: #eff1f7;
  border-radius: 8px;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  margin: 1rem;
`;
export default SearchPageOptions;
