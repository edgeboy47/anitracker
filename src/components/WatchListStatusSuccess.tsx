import { FilterOptions } from "../pages/WatchListPage";
import WatchListItemsWithStatus from "./WatchListItemsWithStatus";
import WatchListPageAllItems from "./WatchListPageAllItems";

type Props = {
  filterOptions: FilterOptions
};
const WatchListStatusSuccess = ({ filterOptions }: Props) => {
  if (filterOptions.status === undefined) {
    return <WatchListPageAllItems filterOptions={filterOptions} />;
  }
  return <WatchListItemsWithStatus filterOptions={filterOptions} status={filterOptions.status} />;
};
export default WatchListStatusSuccess;
