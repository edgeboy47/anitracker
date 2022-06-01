import styled from "styled-components";
import { useEffect, useState } from "react";
import { WatchStatus } from "../api/firebase";
import { useAppDispatch } from "../app/hooks";
import { getUserWatchList, selectWatchList, selectWatchListError, selectWatchListStatus } from "../features/watchlist/watchlistSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { Status } from "../features/anime/animeSlice";

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
    return <div>You must be logged in to use this feature</div>
  }
  return (
    <StyledWatchListPage>
      <StyledWatchListPageControls>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div id="selectDiv">
          <span>Group by Status</span>
          <select name="status" id="status">
            <option value="All">All</option>
            {Object.values(WatchStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </StyledWatchListPageControls>
      <StyledWatchListContent>Content
        {watchListStatus === Status.Loading && <div>Loading...</div>}
        {watchListStatus === Status.Error && <div>{watchListError}</div>}
        {watchListStatus === Status.Success && (
          <img src={watchList[0].imageURL} alt={watchList[0].title} />
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

const StyledWatchListPageControls = styled.aside`
  display: flex;
  flex-direction: column;
  font: inherit;
  gap: 1rem;
  padding: 1rem;

  input {
    background: #eff1f7;
    border-radius: 8px;
    padding: 1rem;
    outline: none;
    border: none;
    font-size: 1rem;
  }

  #selectDiv {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;

    span {
      font-size: 0.875rem;
    }
  }
`;

const StyledWatchListContent = styled.section``;
