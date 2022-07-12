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
      <div className="img">
        <img
          src={anime?.coverImage?.extraLarge}
          alt={anime.title!.english || anime.title!.romaji}
        />
      </div>
      <AnimeListCardControls anime={anime} />
      <AnimeListCardTitle>
        {anime.title!.english || anime.title!.romaji}
      </AnimeListCardTitle>
    </StyledCard>
  );
};
export default AnimeListCard;

const StyledCard = styled.div`
  display: grid;
  grid-template-rows: 1fr 56px;
  flex-direction: column;
  width: 200px;
  position: relative;

  @media screen and (max-width: 699px) {
    width: 100%;
    height: auto;
  }

  :hover .mainIcon > div {
    opacity: 1;
    transform: scale(1);
  }

  > .img {
    height: 280px;
    width: 100%;

    @media screen and (max-width: 699px) {
      height: 100%;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const AnimeListCardTitle = styled.div`
  font-weight: 500;
  padding: 1rem 0 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
