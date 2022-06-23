import styled from "styled-components";
import Anime from "../api/anime";
import AnimeListCardControls from "./AnimeListCardControls";

type Props = {
  anime: Anime;
};

const AnimeListCard = ({ anime }: Props) => {
  return (
    <StyledCard>
      {/* TODO add onclick to navigate to details page */}
      <img
        src={anime?.coverImage?.large}
        alt={anime.title!.english || anime.title!.romaji}
      />
      <AnimeListCardControls anime={anime} />
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

  :hover .mainIcon > div {
    opacity: 1;
    transform: scale(1);
  }

  img {
    max-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    object-fit: cover;
    border-radius: 4px;
  }

  > span {
    font-weight: 500;
    padding: 1rem 0;
  }
`;

