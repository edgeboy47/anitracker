import styled from "styled-components";
import { WatchListItem } from "../api/firebase";

type Props = {
  item: WatchListItem;
};

const WatchListPageCard = ({ item }: Props) => {
  return (
    <StyledCard>
      <img src={item.imageURL} alt={item.title} />
      <StyledCardText>
        <span>{item.title}</span>
      </StyledCardText>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  width: 200px;
  height: 265px;
  position: relative;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  img {
    width:100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const StyledCardText = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: inherit;
  padding: 0.5rem;
  background: #111;
  opacity: 0.9;
  color: #eee;
`;

export default WatchListPageCard;
