import { useSelector } from "react-redux";
import styled from "styled-components";
import { WatchStatus } from "../api/firebase";
import { selectWatchList } from "../features/watchlist/watchlistSlice";
import { FilterOptions } from "../pages/WatchListPage";
import WatchListPageItems from "./WatchListPageItems";

type Props = {
  filterOptions: FilterOptions;
  status: WatchStatus;
};

const WatchListItemsWithStatus = ({ filterOptions, status }: Props) => {
  const watchlist = useSelector(selectWatchList);
  const items = watchlist?.filter((item) => {
    let filter =
      item.status === status &&
      item.title
        .toLowerCase()
        .includes(filterOptions.title?.toLowerCase() ?? "");

    if (filterOptions.season && item.season !== filterOptions.season)
      return false;
    if (filterOptions.year && item.year !== filterOptions.year) return false;
    if (filterOptions.genre && !item.genres.includes(filterOptions.genre))
      return false;

    return filter;
  });

  if (watchlist && items && items.length > 0) {
    return (
      <ItemsWithStatus>
        <span>{status.toString()}</span>
        <WatchListPageItems items={items} />
      </ItemsWithStatus>
    );
  } else return null;
};

const ItemsWithStatus = styled.div`
  > span {
    font-weight: 500;
    font-size: 1.125rem;
  }
`;
export default WatchListItemsWithStatus;
