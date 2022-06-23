import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Anime from "../../api/anime";
import * as client from "../../api/anilist";
import { RootState } from "../../app/store";

export enum Status {
  Loading = "loading",
  Success = "success",
  Error = "error",
  Idle = "idle",
}

interface AnimeState {
  seasonal: Anime[] | null;
  popular: Anime[] | null;
  trending: Anime[] | null;
  search: Anime[] | null;
  status: Status;
  error: string | null;
}

const initialState: AnimeState = {
  seasonal: null,
  popular: null,
  trending: null,
  search: null,
  status: Status.Idle,
  error: null,
};

// Async thunks
export const getCurrentSeasonalAnime = createAsyncThunk<Anime[]>(
  "anime/getCurrentSeason",
  async (): Promise<Anime[]> => {
    return client.getCurrentSeasonalAnime();
  }
);

// Slice
const animeSlice = createSlice({
  name: "anime",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.status = Status.Idle;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentSeasonalAnime.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getCurrentSeasonalAnime.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.seasonal = action.payload;
      })
      .addCase(getCurrentSeasonalAnime.rejected, (state, action) => {
        state.status = Status.Error;
        // state.error = action.error.message;
      })
  },
});

// Selectors
export const selectSeasonal = (state: RootState) => state.anime.seasonal;
export const selectTrending = (state: RootState) => state.anime.trending;
export const selectPopular = (state: RootState) => state.anime.popular;
export const selectStatus = (state: RootState) => state.anime.status;

export default animeSlice.reducer;
