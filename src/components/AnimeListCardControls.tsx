import { useState } from "react";
import { AiFillCalendar, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import { MdCheck } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Anime from "../api/anime";
import { WatchStatus } from "../api/firebase";
import { useAppDispatch } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import {
  addToWatchList,
  selectWatchList,
  updateWatchListEntry,
} from "../features/watchlist/watchlistSlice";

type Props = {
  anime: Anime;
};

const AnimeListCardControls = ({ anime }: Props) => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const watchlist = useSelector(selectWatchList);
  const [isDisabled, setIsDisabled] = useState(false);

  if (!user) return null;

  if (user && watchlist.some((item) => item.id === anime.id) === false) {
    return (
      <ControlsContainer>
        <div className="mainIcon">
          <StyledControls>
            <div
              onClick={() => {
                if (isDisabled) return;
                setIsDisabled(true);
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
        </div>
        <div className="hidden">
          <StyledControls>
            <MdCheck
              onClick={() => {
                // TODO display toast when op is successful
                dispatch(
                  addToWatchList({
                    userID: user.uid,
                    anime,
                    status: WatchStatus.Completed,
                  })
                );
              }}
            />
          </StyledControls>
          <StyledControls>
            <AiFillCalendar
              onClick={() => {
                dispatch(
                  addToWatchList({
                    userID: user.uid,
                    anime,
                    status: WatchStatus.Planning,
                  })
                );
              }}
            />
          </StyledControls>
          <StyledControls>
            <IoMdPlay
              onClick={() => {
                dispatch(
                  addToWatchList({
                    userID: user.uid,
                    anime,
                    status: WatchStatus.Watching,
                  })
                );
              }}
            />
          </StyledControls>
          <StyledControls>
            <TiCancel
              onClick={() => {
                dispatch(
                  addToWatchList({
                    userID: user.uid,
                    anime,
                    status: WatchStatus.Dropped,
                  })
                );
              }}
            />
          </StyledControls>
        </div>
      </ControlsContainer>
    );
  }
  // If the anime is already in the user's watchlist
  if (user && watchlist.some((item) => item.id === anime.id) === true) {
    return (
      <ControlsContainer>
        <div className="mainIcon">
          <StyledControls>
            <AiFillEdit />
          </StyledControls>
        </div>
        <div className="hidden">
          <StyledControls>
            <MdCheck
              onClick={() => {
                // TODO add update function if show is already in watchlist
                dispatch(
                  updateWatchListEntry({
                    userID: user.uid,
                    anime,
                    status: WatchStatus.Completed,
                  })
                );
              }}
            />
          </StyledControls>
          <StyledControls>
            <AiFillCalendar
              onClick={() => {
                dispatch(
                  updateWatchListEntry({
                    userID: user.uid,
                    anime,
                    status: WatchStatus.Planning,
                  })
                );
              }}
            />
          </StyledControls>
          <StyledControls>
            <IoMdPlay
              onClick={() => {
                dispatch(
                  updateWatchListEntry({
                    userID: user.uid,
                    anime,
                    status: WatchStatus.Watching,
                  })
                );
              }}
            />
          </StyledControls>
          <StyledControls>
            <TiCancel
              onClick={() => {
                dispatch(
                  updateWatchListEntry({
                    userID: user.uid,
                    anime,
                    status: WatchStatus.Dropped,
                  })
                );
              }}
            />
          </StyledControls>
        </div>
      </ControlsContainer>
    );
  }

  return <></>;
};

const StyledControls = styled.div`
  background-color: #111;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &&&:hover {
    /* &&& is necessary for higher specificity, to ensure this hover shows correctly */
    /* See https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity */
    transform: scale(1.2);
  }

  svg {
    width: 24px;
    height: 24px;
    color: #eee;
  }
`;

const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  /* Hidden buttons */
  .hidden {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    visibility: hidden;
  }

  /* Main button */
  .mainIcon {
    padding: 0.5rem;
  }

  /* Show hidden controls only when the main button is hovered */
  .mainIcon:hover + .hidden {
    visibility: visible;
  }

  .mainIcon:hover + .hidden div {
    opacity: 1;
    transform: scale(1);
  }

  /* When hidden is hovered after main is first hovered, keep hidden visible */
  /* If hidden is hovered with main being hovered first, it will not be visible */
  .hidden:hover {
    visibility: visible;
  }

  .hidden:hover div {
    opacity: 1;
    transform: scale(1);
  }
`;

export default AnimeListCardControls;
