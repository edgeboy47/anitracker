import Anime, { AnimeSeason, Convert } from "./anime";

const url: string = "https://graphql.anilist.co";

export type SearchOptions = {
  title?: string;
  year?: number;
  season?: AnimeSeason;
  genre?: string;
};

export const getTrendingAnime = async (): Promise<Anime[]> => {
  const query = `
  query {
    Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: TRENDING_DESC, isAdult: false, format: TV) {
        id
        title {
          romaji
          english
        }
        bannerImage
        coverImage {
          extraLarge
          large
          color
        }
        season
        seasonYear
        description
        type
        format
        status
        episodes
        duration
        genres
        isAdult
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
  
  `;

  const response = await queryFetch(query);
  const data = await response.json();

  const list = data.data.Page.media.map((anime: object) =>
    Convert.toAnime(JSON.stringify(anime))
  ) as Anime[];

  return list;
};

export const getCurrentSeasonalAnime = async (): Promise<Anime[]> => {
  const { season, year } = getCurrentSeason();
  return getSeasonalAnime(season, year);
};

export const getSeasonalAnime = async (
  season: AnimeSeason,
  year: number
): Promise<Anime[]> => {
  const query = `
  query($season: MediaSeason, $seasonYear: Int) {
    Page(page: 1, perPage: 10) {
      media(
        season: $season,
        seasonYear: $seasonYear,
        type: ANIME, sort: POPULARITY_DESC, isAdult: false, format: TV) {
        id
        title {
          romaji
          english
        }
        bannerImage
        coverImage {
          extraLarge
          large
          color
        }
        season
        seasonYear
        description
        type
        format
        status
        episodes
        duration
        genres
        isAdult
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }
  `;

  const vars = {
    season: season,
    seasonYear: year,
  };

  const response = await queryFetch(query, vars);
  const data = await response.json();

  const list = data.data.Page.media.map((anime: object) =>
    Convert.toAnime(JSON.stringify(anime))
  ) as Anime[];

  return list;
};

export const getPopularAnime = async (): Promise<Anime[]> => {
  const query = `
  query {
    Page(page: 1, perPage: 10) {
      media(type: ANIME, sort: POPULARITY_DESC, isAdult: false, format: TV) {
        id
        title {
          romaji
          english
        }
        bannerImage
        coverImage {
          extraLarge
          large
          color
        }
        season
        seasonYear
        description
        type
        format
        status
        episodes
        duration
        genres
        isAdult
        averageScore
        popularity
        nextAiringEpisode {
          airingAt
          timeUntilAiring
          episode
        }
      }
    }
  }  
  `;

  const vars = {};

  const response = await queryFetch(query, vars);
  const data = await response.json();

  const list = data.data.Page.media.map((anime: object) =>
    Convert.toAnime(JSON.stringify(anime))
  ) as Anime[];

  return list;
};

const queryFetch = async (
  query: string,
  vars: SearchOptions = {}
): Promise<Response> => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: vars,
    }),
  });
};

export const getCurrentSeason = (): { season: AnimeSeason; year: number } => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  let season: AnimeSeason;

  if (month >= 0 && month <= 2) season = AnimeSeason.Winter;
  else if (month >= 3 && month <= 5) season = AnimeSeason.Spring;
  else if (month >= 6 && month <= 8) season = AnimeSeason.Summer;
  else season = AnimeSeason.Fall;

  return {
    season: season,
    year: year,
  };
};
