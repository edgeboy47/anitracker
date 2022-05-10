export default interface Anime {
  id?: number;
  title?: Title;
  coverImage?: CoverImage;
  startDate?: EndDateClass;
  endDate?: EndDateClass;
  bannerImage?: string;
  season?: string;
  seasonYear?: number;
  description?: string;
  type?: string;
  format?: string;
  status?: string;
  episodes?: number;
  duration?: number;
  genres?: string[];
  isAdult?: boolean;
  averageScore?: number;
  popularity?: number;
  nextAiringEpisode?: NextAiringEpisode;
}

export interface CoverImage {
  extraLarge?: string;
  large?: string;
  color?: string;
}

export interface EndDateClass {
  year?: number;
  month?: number;
  day?: number;
}

export interface NextAiringEpisode {
  airingAt?: number;
  timeUntilAiring?: number;
  episode?: number;
}

export interface Title {
  userPreferred?: string;
  english?: string;
  romaji?: string;
  native?: string;
}

export enum AnimeSeason {
  Winter = "WINTER",
  Spring = "SPRING",
  Summer = "SUMMER",
  Fall = "FALL",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toAnime(json: string): Anime {
    return JSON.parse(json);
  }

  public static animeToJson(value: Anime): string {
    return JSON.stringify(value);
  }
}
