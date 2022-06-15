import { useSelector } from "react-redux/es/hooks/useSelector";
import styled from "styled-components";
import { WatchStatus } from "../api/firebase";
import { Status } from "../features/anime/animeSlice";
import {
  selectWatchList,
  selectWatchListStatus,
  selectWatchListError,
} from "../features/watchlist/watchlistSlice";
import WatchListStatusSuccess from "./WatchListStatusSuccess";

type Props = {
  search: string;
  watchStatusFilter: "All" | WatchStatus;
};

const WatchListPageContent = ({ search, watchStatusFilter }: Props) => {
  const watchlist = useSelector(selectWatchList);
  const watchlistStatus = useSelector(selectWatchListStatus);
  const watchlistError = useSelector(selectWatchListError);

  return (
    <StyledWatchListContent>
      {watchlistStatus === Status.Loading && watchlist === null && (
        <div>Loading...</div>
      )}
      {watchlistStatus === Status.Error && <div>{watchlistError}</div>}
      {(watchlistStatus === Status.Success ||
        (watchlistStatus === Status.Loading && watchlist)) && (
        <WatchListStatusSuccess search={search} status={watchStatusFilter} />
      )}
    </StyledWatchListContent>
  );
};

const StyledWatchListContent = styled.section``;
export default WatchListPageContent;
