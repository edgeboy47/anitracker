import { WatchStatus } from "../api/firebase";
import WatchListItemsWithStatus from "./WatchListItemsWithStatus";
import WatchListPageAllItems from "./WatchListPageAllItems";

type Props = {
  status: "All" | WatchStatus;
  search: string;
};
const WatchListStatusSuccess = ({ search, status }: Props) => {
  if (status === "All") {
    return <WatchListPageAllItems search={search} />;
  }
  return <WatchListItemsWithStatus search={search} status={status} />;
};
export default WatchListStatusSuccess;
