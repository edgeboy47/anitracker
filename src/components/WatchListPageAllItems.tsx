import styled from "styled-components";
import { WatchStatus } from "../api/firebase";
import { FilterOptions } from "../pages/WatchListPage";
import WatchListItemsWithStatus from "./WatchListItemsWithStatus";

type Props = {
  filterOptions: FilterOptions;
};
const WatchListPageAllItems = ({ filterOptions }: Props) => {
  return (
    <AllItems>
      {Object.values(WatchStatus).map((status) => {
        return (
          <WatchListItemsWithStatus
            key={status}
            status={status}
            filterOptions={filterOptions}
          />
        );
      })}
    </AllItems>
  );
};

const AllItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
export default WatchListPageAllItems;
