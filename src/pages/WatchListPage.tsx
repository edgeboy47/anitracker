import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { getUserWatchList } from "../features/watchlist/watchlistSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import WatchListPageControls from "../components/WatchListPageControls";
import { WatchStatus } from "../api/firebase";
import WatchListPageContent from "../components/WatchListPageContent";

const WatchListPage = () => {
  const [search, setSearch] = useState("");
  const [watchStatusFilter, setWatchStatusFilter] = useState<
    "All" | WatchStatus
  >("All");
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
        search={search}
        setSearch={setSearch}
        watchStatusFilter={watchStatusFilter}
        setWatchStatusFilter={setWatchStatusFilter}
      />
      <WatchListPageContent
        search={search}
        watchStatusFilter={watchStatusFilter}
      />
    </StyledWatchListPage>
  );
};

export default WatchListPage;

const StyledWatchListPage = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: auto 1fr;
`;
