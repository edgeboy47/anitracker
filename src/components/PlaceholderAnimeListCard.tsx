import ContentLoader from "react-content-loader";

const PlaceholderAnimeListCard = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={500}
      viewBox="0 0 400 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="2" ry="2" width="200" height="360" />
      <rect x="3" y="380" rx="0" ry="0" width="160" height="20" />
    </ContentLoader>
  );
};
export default PlaceholderAnimeListCard;
