import styled from "styled-components";
import { WatchStatus } from "../api/firebase";
import WatchListItemsWithStatus from "./WatchListItemsWithStatus";

type Props = {
  search: string;
};
const WatchListPageAllItems = ({ search }: Props) => {
  return (
    <AllItems>
      {Object.values(WatchStatus).map((status) => {
        return (
          <WatchListItemsWithStatus
            key={status}
            status={status}
            search={search}
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
