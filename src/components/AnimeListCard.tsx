import styled from "styled-components";
import Anime from "../api/anime";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../app/hooks";
import {
  addToWatchList,
  selectWatchList,
} from "../features/watchlist/watchlistSlice";
import { WatchStatus } from "../api/firebase";

type Props = {
  anime: Anime;
};

const AnimeListCard = ({ anime }: Props) => {
  const user = useSelector(selectUser);
  const watchlist = useSelector(selectWatchList);
  const dispatch = useAppDispatch();

  return (
    <StyledCard>
      <img
        src={anime?.coverImage?.large}
        alt={anime.title!.english || anime.title!.romaji}
      />
      {user && watchlist.some((item) => item.id === anime.id) === false && (
        <StyledControls>
          <div
            onClick={() => {
              dispatch(
                addToWatchList({
                  userID: user.uid,
                  anime,
                  status: WatchStatus.Completed,
                })
              );
            }}
          >
            <AiOutlinePlus />
          </div>
        </StyledControls>
      )}
      <span>{anime.title!.english || anime.title!.romaji}</span>
    </StyledCard>
  );
};
export default AnimeListCard;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  position: relative;

  :hover > div {
    opacity: 1;
  }

  img {
    max-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
  }

  span {
    font-weight: 500;
    margin: 1rem 0;
  }
`;

const StyledControls = styled.div`
  bottom: 10px;
  right: 10px;
  background-color: #111;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  opacity: 0;
  transition: all 0.2s;
  position: absolute;
  z-index: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    transform: scale(1.25);
  }

  svg {
    width: 24px;
    height: 24px;
    color: #eee;
  }
`;
