import styled from "styled-components";
import { SearchOptions } from "../api/anilist";

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
export default SearchPageOptions;
