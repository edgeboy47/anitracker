import { useSelector } from "react-redux";
import styled from "styled-components";
import { WatchStatus } from "../api/firebase";
import { selectWatchList } from "../features/watchlist/watchlistSlice";
import WatchListPageItems from "./WatchListPageItems";

type Props = {
  search: string;
  status: WatchStatus;
};

const WatchListItemsWithStatus = ({ search, status }: Props) => {
  const watchlist = useSelector(selectWatchList);
  const items = watchlist?.filter(
    (item) =>
      item.status === status &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

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
