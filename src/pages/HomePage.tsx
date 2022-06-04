import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentSeason } from "../api/anilist";
import {
  getCurrentSeasonalAnime,
  selectSeasonal,
  selectStatus,
  Status,
} from "../features/anime/animeSlice";
import AnimeList from "../components/AnimeList";
import Searchbar from "../components/Searchbar";
import { useAppDispatch } from "../app/hooks";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectStatus);
  const seasonal = useSelector(selectSeasonal);
  const { season, year } = getCurrentSeason();

  useEffect(() => {
    // TODO fix bug when seasonal is null and status is success
    // To reproduce, go to search page, refresh, then go back to home page
    console.log('in homepage useeffect')
    if (seasonal === null || status === Status.Idle) {
      console.log("fetching seasonal anime");
      dispatch(getCurrentSeasonalAnime());
    }
  }, [status, dispatch, seasonal]);

  const renderFromStatus = (status: Status): JSX.Element => {
    let element = <div>Loading...</div>;

    switch (status) {
      case Status.Idle:
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
      <Searchbar />
      <StyledTitle>{`${season} ${year} Anime`}</StyledTitle>
      {renderFromStatus(status)}
    </div>
  );
};

const StyledTitle = styled.h1`
  font-weight: bold;
`;
