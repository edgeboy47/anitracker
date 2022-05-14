import styled from "styled-components";
import Anime from "../api/anime";

type Props = {
  anime: Anime;
};
const AnimeListCard = ({ anime }: Props) => {
  return (
    <StyledCard>
      <img src={anime?.coverImage?.large} alt={anime.title!.english} />
      <span>{anime.title!.english}</span>
    </StyledCard>
  );
};
export default AnimeListCard;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;

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
