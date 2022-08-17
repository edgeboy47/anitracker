import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { getUserWatchList } from "../features/watchlist/watchlistSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import WatchListPageControls from "../components/WatchListPageControls";
import { WatchStatus } from "../api/firebase";
import WatchListPageContent from "../components/WatchListPageContent";
import { AnimeSeason } from "../api/anime";

export type FilterOptions = {
  status?: WatchStatus;
  title?: string;
  year?: number;
  season?: AnimeSeason;
  genre?: string;
}

const WatchListPage = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  // Set page title on mount
  useEffect(() => {
    document.title = "Watch List";
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getUserWatchList(user.uid));
    }
  }, [dispatch, user]);

  if (user === null) {
    return <div>You must be logged in to use this feature</div>;
  }

  return (
    <StyledWatchListPage>
      <WatchListPageControls
        filterOptions={filterOptions}
        setFilterOptions = {setFilterOptions}
      />
      <WatchListPageContent
        filterOptions={filterOptions}
      />
    </StyledWatchListPage>
  );
};

export default WatchListPage;

const StyledWatchListPage = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: auto 1fr;
  padding-top: 1rem;

  @media screen and (max-width: 950px){
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;
