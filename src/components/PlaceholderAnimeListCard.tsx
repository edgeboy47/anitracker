import ContentLoader from "react-content-loader";

const PlaceholderAnimeListCard = () => {
  return (
    <ContentLoader
      speed={2}
      width={200}
      height={336}
      viewBox="0 0 200 336"
      backgroundColor="#fcfcfc"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="2" ry="2" width="200" height="280" />
      <rect x="0" y="296" rx="0" ry="0" width="200" height="40" />
    </ContentLoader>
  );
};
export default PlaceholderAnimeListCard;
