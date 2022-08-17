import { useState } from "react";
import { IoMdOptions } from "react-icons/io";
import styled from "styled-components";
import { AnimeSeason } from "../api/anime";
import { WatchStatus } from "../api/firebase";
import { useGetGenresQuery } from "../features/anime/animeAPISlice";
import { FilterOptions } from "../pages/WatchListPage";
import {
  ExtraOptionsButton,
  MainSearchOption,
  SecondarySearchOptions,
  StyledInput,
  StyledInputContainer,
  StyledSelect,
} from "./SearchPageOptions";

type Props = {
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
};

const WatchListPageControls = ({ filterOptions, setFilterOptions }: Props) => {
  const { data: genres } = useGetGenresQuery();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledWatchListPageControls>
      <MainSearchOption>
        <StyledInputContainer>
          <span>Title</span>
          <StyledInput
            type="text"
            placeholder="Title"
            value={filterOptions.title ?? ""}
            onChange={(e) =>
              setFilterOptions((prevOptions) => ({
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

      <SecondaryFilterOptions isOpen={isOpen}>
        <StyledInputContainer>
          <span>Status</span>
          <StyledSelect
            name="status"
            id="status"
            onChange={(e) => {
              if (e.target.value === "All") {
                setFilterOptions((prevOptions) => ({
                  ...prevOptions,
                  status: undefined,
                }));
              } else {
                setFilterOptions((prevOptions) => ({
                  ...prevOptions,
                  status:
                    WatchStatus[e.target.value as keyof typeof WatchStatus],
                }));
              }
            }}
          >
            <option value="All">All</option>
            {Object.values(WatchStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </StyledSelect>
        </StyledInputContainer>
        <StyledInputContainer>
          <span>Year</span>
          <StyledInput
            type="number"
            name="year"
            id="year"
            placeholder="Year"
            max={new Date().getFullYear()}
            value={filterOptions.year ?? ""}
            onChange={(e) =>
              setFilterOptions((prevOptions) => ({
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
                setFilterOptions((prevOptions) => ({
                  ...prevOptions,
                  season: undefined,
                }));
              } else {
                setFilterOptions((prevOptions) => ({
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
          <StyledSelect name="genre" id="genre"
          onChange={(e) => {
            const val = e.target.value;
            if (val === "All") {
              setFilterOptions((prevOptions) => ({
                ...prevOptions,
                genre: undefined,
              }));
            } else {
              setFilterOptions((prevOptions) => ({
                ...prevOptions,
                genre: val,
              }));
            }
          }}>
            <option value="All">All</option>
            {genres &&
              genres.map((genre) => (
                <option key={genre.genre} value={genre.genre}>
                  {genre.genre}
                </option>
              ))}
          </StyledSelect>
        </StyledInputContainer>
      </SecondaryFilterOptions>
    </StyledWatchListPageControls>
  );
};

const StyledWatchListPageControls = styled.aside`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  font: inherit;
  gap: 1rem;
  padding-right: 1rem;
`;

const SecondaryFilterOptions = styled(SecondarySearchOptions)`
  flex-direction: column;

  input,
  select {
    width: 100%;
  }

  @media screen and (max-width: 950px) {
    flex-direction: row;
  }

  @media screen and (max-width: 660px) {
    flex-direction: column;
    gap: 0.5em;
  }
`;
export default WatchListPageControls;
