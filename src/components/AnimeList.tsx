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
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 1rem;
`;
