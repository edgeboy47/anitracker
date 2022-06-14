import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import {
  getUserWatchList,
  selectWatchList,
  selectWatchListError,
  selectWatchListStatus,
} from "../features/watchlist/watchlistSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { Status } from "../features/anime/animeSlice";
import WatchListPageItems from "../components/WatchListPageItems";
import WatchListPageControls from "../components/WatchListPageControls";
import { WatchListItem, WatchStatus } from "../api/firebase";

const WatchListPage = () => {
  const [search, setSearch] = useState("");
  const [watchStatusFilter, setWatchStatusFilter] = useState<
    "All" | WatchStatus
  >("All");
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const watchlist = useSelector(selectWatchList);
  const watchlistStatus = useSelector(selectWatchListStatus);
  const watchlistError = useSelector(selectWatchListError);

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
        search={search}
        setSearch={setSearch}
        watchStatusFilter={watchStatusFilter}
        setWatchStatusFilter={setWatchStatusFilter}
      />
      <StyledWatchListContent>
        {watchlistStatus === Status.Loading && watchlist === null && (
          <div>Loading...</div>
        )}
        {watchlistStatus === Status.Error && <div>{watchlistError}</div>}
        {(watchlistStatus === Status.Success ||
          (watchlistStatus === Status.Loading && watchlist)) && (
          <WatchListPageItems
            items={filterWatchListItems(watchlist!, search, watchStatusFilter)}
          />
        )}
      </StyledWatchListContent>
    </StyledWatchListPage>
  );
};

const filterWatchListItems = (
  watchlist: WatchListItem[],
  search: string,
  watchStatusFilter: "All" | WatchStatus
): WatchListItem[] => {
  let copy = [...watchlist];

  if (search)
    copy = copy.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  if (watchStatusFilter !== "All")
    copy = copy.filter((item) => item.status === watchStatusFilter);

  return copy;
};

export default WatchListPage;

const StyledWatchListPage = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: auto 1fr;
`;

const StyledWatchListContent = styled.section``;
