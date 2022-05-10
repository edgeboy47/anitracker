import Anime, { AnimeSeason, Convert } from "./anime";

const url: string = "https://graphql.anilist.co";

export const searchAnime = async (title: String): Promise<Anime[]> => {
  const query = `
    query ($title: String!) {
      Page(page: 1, perPage: 10) {
        media(type: ANIME, search: $title, sort: POPULARITY_DESC, format: TV) {
          id
          title {
            romaji
            english
          }
          bannerImage
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
    title: title,
  };

  const response = await queryFetch(query, vars);

  const data = await response.json();

  const list = data.data.Page.media.map((anime: object) =>
    Convert.toAnime(JSON.stringify(anime))
  ) as Anime[];

  return list;
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
  vars: object = {}
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
