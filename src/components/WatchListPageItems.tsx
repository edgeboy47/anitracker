import styled from "styled-components";
import { WatchListItem } from "../api/firebase";
import WatchListPageCard from "./WatchListPageCard";

type Props = {
  items: WatchListItem[];
};

const WatchListPageItems = ({ items }: Props) => {
  // TODO: separate cards by status in UI
  return (
    <StyledItems>
      {[...items]
        .sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        })
        .map((item) => (
          <WatchListPageCard key={item.id} item={item} />
        ))}
    </StyledItems>
  );
};

const StyledItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 5rem;
  margin-top: 2rem;
`;

export default WatchListPageItems;
