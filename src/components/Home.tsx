import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentSeason } from "../api/anilist";
import { AppDispatch } from "../app/store";
import {
  getCurrentSeasonalAnime,
  selectSeasonal,
  selectStatus,
  Status,
} from "../features/anime/animeSlice";
import AnimeList from "./AnimeList";

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector(selectStatus);
  const seasonal = useSelector(selectSeasonal);
  const { season, year } = getCurrentSeason();

  useEffect(() => {
    if (status === Status.Initial) dispatch(getCurrentSeasonalAnime());
  }, [status, dispatch]);

  const renderFromStatus = (status: Status): JSX.Element => {
    let element = <div>Loading...</div>;

    switch (status) {
      case Status.Initial:
      case Status.Loading:
        break;

      case Status.Success:
        element = <AnimeList animeList={seasonal!} />;
        break;

      case Status.Error:
        // TODO error state
        element = <div>Error</div>;
        break;
    }

    return element;
  };

  return (
    <div>
      <StyledTitle>{`${season} ${year} Anime`}</StyledTitle>
      {renderFromStatus(status)}
    </div>
  );
};

const StyledTitle = styled.h1`
  font-weight: bold;
`;
