import styled from "styled-components";
import PlaceholderAnimeListCard from "./PlaceholderAnimeListCard";

const PlaceholderAnimeList = () => {
  const data = Array(10).fill("a");
  return (
    <PlaceholderList>
      {data.map((_, index) => (
        <PlaceholderAnimeListCard key={index} />
      ))}
    </PlaceholderList>
  );
};

const PlaceholderList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem 1.125rem;
  margin-block: 5rem;
  justify-items: center;
`;
export default PlaceholderAnimeList;
