import styled from "styled-components";
import Anime from "../api/anime";
import AnimeListCard from "./AnimeListCard";

type Props = {
  animeList: Anime[];
};

const AnimeList = ({ animeList }: Props) => {
  return (
    <StyledAnimeList>
      {animeList.map((anime) => (
        <AnimeListCard key={anime.id!} anime={anime} />
      ))}
    </StyledAnimeList>
  );
};

export default AnimeList;

const StyledAnimeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem 1.125rem;
  margin-top: 5rem;
  padding-bottom: 2rem;
  justify-items: center;

  @media screen and (max-width: 699px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
`;
