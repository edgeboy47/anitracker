import { useSelector } from "react-redux/es/hooks/useSelector";
import styled from "styled-components";
import { WatchStatus } from "../api/firebase";
import { Status } from "../features/anime/animeSlice";
import {
  selectWatchList,
  selectWatchListStatus,
  selectWatchListError,
} from "../features/watchlist/watchlistSlice";
import { FilterOptions } from "../pages/WatchListPage";
import WatchListStatusSuccess from "./WatchListStatusSuccess";

type Props = {
  filterOptions: FilterOptions
};

const WatchListPageContent = ({ filterOptions }: Props) => {
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
        <WatchListStatusSuccess filterOptions={filterOptions} />
      )}
    </StyledWatchListContent>
  );
};

const StyledWatchListContent = styled.section``;
export default WatchListPageContent;
