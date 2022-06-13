import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { WatchListItem } from "../api/firebase";
import { useAppDispatch } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import { removeFromWatchList } from "../features/watchlist/watchlistSlice";

type Props = {
  item: WatchListItem;
};


const WatchListPageCard = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);

  return (
    <StyledCard>
      <img src={item.imageURL} alt={item.title} />
      <CancelButton
        onClick={(e) => {
          if(user)
          dispatch(removeFromWatchList({userID: user.uid, animeID: item.id}))
       }}>
        <MdOutlineDelete />
      </CancelButton>
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
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  :hover > div:nth-of-type(1) {
    visibility: visible;
    transform: scale(1)
  }
`;

const StyledCardText = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border-radius: inherit;
  padding: 0.75rem;
  background: #111;
  opacity: 0.9;
  color: #eee;
`;

const CancelButton = styled.div`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  background: #111;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  transition: all 0.2s ease-in;
  transform: scale(0);
  padding: 0.25rem;
  margin: 0.25rem;

  svg {
    width: 24px;
    height: 24px;
    color: white;
  }
`;

export default WatchListPageCard;
