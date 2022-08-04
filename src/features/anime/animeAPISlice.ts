import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";
import { SearchOptions } from "../../api/anilist";
import Anime, { AnimeSeason, Genre } from "../../api/anime";

const baseURL: string = "https://graphql.anilist.co";

interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
}

interface APIResponse {
  Page: {
    pageInfo: PageInfo;
    media: Anime[];
  };
}

interface PaginatedSearchOptions extends SearchOptions {
  page: number;
}

const getCurrentSeason = (): { season: AnimeSeason; seasonYear: number } => {
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
    seasonYear: year,
  };
};

export const animeApiSlice = createApi({
  reducerPath: "animeAPI",
  baseQuery: graphqlRequestBaseQuery({
    url: baseURL,
  }),
  endpoints: (builder) => ({
    searchAnime: builder.query<APIResponse, PaginatedSearchOptions>({
      query: (options) => ({
        document: gql`
          query (
            $title: String
            $season: MediaSeason
            $year: Int
            $page: Int = 1
            $genre: String
          ) {
            Page(page: $page, perPage: 15) {
              pageInfo {
                total
                perPage
                currentPage
                lastPage
                hasNextPage
              }
              media(
                type: ANIME
                search: $title
                season: $season
                genre: $genre
                seasonYear: $year
                sort: POPULARITY_DESC
                format: TV
              ) {
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
        `,
        variables: options,
      }),
    }),
    getCurrentSeasonalAnime: builder.query<APIResponse, void>({
      query: () => {
        const vars = getCurrentSeason();
        return {
          document: gql`
            query ($season: MediaSeason, $seasonYear: Int) {
              Page(page: 1, perPage: 5) {
                media(
                  season: $season
                  seasonYear: $seasonYear
                  type: ANIME
                  sort: POPULARITY_DESC
                  isAdult: false
                  format: TV
                ) {
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
          `,
          variables: vars,
        };
      },
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => ({
        document: gql`
          query {
            genres: GenreCollection
          }
        `,
      }),
      transformResponse: (response: { genres: String[] }) =>
        response.genres.map((genre) => {
          return { genre } as Genre;
        }),
    }),
  }),
});

export const {
  useSearchAnimeQuery,
  useLazySearchAnimeQuery,
  useGetGenresQuery,
} = animeApiSlice;
