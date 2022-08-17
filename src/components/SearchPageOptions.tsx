import styled from "styled-components";
import { SearchOptions } from "../api/anilist";
import { AnimeSeason } from "../api/anime";
import { useGetGenresQuery } from "../features/anime/animeAPISlice";
import { IoMdOptions } from "react-icons/io";
import { useState } from "react";

type SearchProps = {
  searchOptions: SearchOptions;
  setSearchOptions: React.Dispatch<React.SetStateAction<SearchOptions>>;
};

const SearchPageOptions = ({
  searchOptions,
  setSearchOptions,
}: SearchProps) => {
  const { data: genres } = useGetGenresQuery();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SearchPageOptionsContainer>
      <MainSearchOption>
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

        <ExtraOptionsButton onClick={() => setIsOpen((prev) => !prev)}>
          <IoMdOptions />
        </ExtraOptionsButton>
      </MainSearchOption>
      <SecondarySearchOptions isOpen={isOpen}>
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
            name="season"
            id="season"
            onChange={(e) => {
              if (e.target.value === "All") {
                setSearchOptions((prevOptions) => ({
                  ...prevOptions,
                  season: undefined,
                }));
              } else {
                setSearchOptions((prevOptions) => ({
                  ...prevOptions,
                  season:
                    AnimeSeason[e.target.value as keyof typeof AnimeSeason],
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
      </SecondarySearchOptions>
    </SearchPageOptionsContainer>
  );
};

const SearchPageOptionsContainer = styled.div`
  display: flex;
  gap: 2em;

  @media screen and (max-width: 950px) {
    gap: 1em;
    flex-direction: column;
  }
`;

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  span {
    font-weight: 500;
  }
`;

export const StyledInput = styled.input`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  margin-block: 1rem;
`;

export const StyledSelect = styled.select`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  outline: none;
  border: none;
  font-size: 1rem;
  margin-block: 1rem;
`;

export const MainSearchOption = styled.div`
  @media screen and (max-width: 950px) {
    display: flex;
    width: 100%;
    gap: 1em;
    div:first-child {
      flex-basis: 100%;
    }

    input {
      width: 100%;
    }
  }
`;

interface NavProps {
  isOpen: boolean;
}

export const SecondarySearchOptions = styled.div<NavProps>`
  display: flex;
  gap: 2em;

  @media screen and (max-width: 950px) {
    display: ${(props) => (props.isOpen ? "flex" : "none")};

    div {
      flex: 1;
    }

    input,
    select {
      width: 100%;
    }
  }

  @media screen and (max-width: 660px) {
    flex-direction: column;
    gap: 0.5em;
  }
`;

export const ExtraOptionsButton = styled.div`
  display: none;
  background: white;
  border-radius: 8px;
  height: 52px;

  @media screen and (max-width: 950px) {
    display: block;
    align-self: center;
    margin-top: 20px;
    padding: 1rem;
    cursor: pointer;
    svg {
      width: 24px;
      height: 24px;
      color: #2e51a2;
    }
  }
`;

export default SearchPageOptions;
