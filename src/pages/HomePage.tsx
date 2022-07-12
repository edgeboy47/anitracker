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
import { selectUser } from "../features/auth/authSlice";
import {
  getUserWatchList,
  selectWatchList,
} from "../features/watchlist/watchlistSlice";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const status = useSelector(selectStatus);
  const seasonal = useSelector(selectSeasonal);
  const { season, year } = getCurrentSeason();
  const user = useSelector(selectUser);
  const watchlist = useSelector(selectWatchList);

  // Fetch current seasonal anime if it's not already loaded
  useEffect(() => {
    console.log("in homepage useeffect");
    if (seasonal === null) {
      console.log("fetching seasonal anime");
      dispatch(getCurrentSeasonalAnime());
    }
  }, [dispatch, seasonal]);

  // Fetch user's watchlist if they are logged in and it has not already been fetched
  useEffect(() => {
    if (user && watchlist === null) {
      console.log("fetching user watchlist");
      dispatch(getUserWatchList(user.uid));
    }
  }, [dispatch, user, watchlist]);

  // Set page title on mount
  useEffect(() => {
    document.title = "Anitracker";
  }, []);

  const renderFromStatus = (status: Status): JSX.Element => {
    let element = <div>Loading...</div>;

    switch (status) {
      case Status.Idle:
      case Status.Loading:
        break;

      case Status.Success:
        element = <AnimeList animeList={seasonal ?? []} />;
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
  font-size: clamp(1rem, 1rem + 1.5vw, 2rem);
`;
