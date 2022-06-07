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

const WatchListPage = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const watchList = useSelector(selectWatchList);
  const watchListStatus = useSelector(selectWatchListStatus);
  const watchListError = useSelector(selectWatchListError);

  useEffect(() => {
    if (user) {
      console.log("in watchlistpage useeffect", user);
      dispatch(getUserWatchList(user.uid));
    }
  }, [dispatch, user]);

  if (user === null) {
    return <div>You must be logged in to use this feature</div>;
  }

  return (
    <StyledWatchListPage>
      <WatchListPageControls search={search} setSearch={setSearch} />
      <StyledWatchListContent>
        {watchListStatus === Status.Loading && <div>Loading...</div>}
        {watchListStatus === Status.Error && <div>{watchListError}</div>}
        {watchListStatus === Status.Success && (
          <WatchListPageItems
            items={
              search
                ? watchList.filter((item) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                  )
                : watchList
            }
          />
        )}
      </StyledWatchListContent>
    </StyledWatchListPage>
  );
};

export default WatchListPage;

const StyledWatchListPage = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: auto 1fr;
`;

const StyledWatchListContent = styled.section``;
