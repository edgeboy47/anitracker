import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Anime from "../../api/anime";
import * as client from "../../api/firebase";
import { WatchListItem, WatchStatus } from "../../api/firebase";
import { RootState } from "../../app/store";
import { Status } from "../anime/animeSlice";

interface WatchListState {
  watchlist: WatchListItem[];
  status: Status;
  error: string | null;
}

const initialState: WatchListState = {
  watchlist: [],
  status: Status.Idle,
  error: null,
};

// Async thunks
export const getUserWatchList = createAsyncThunk(
  "watchlist/getuserwatchlist",
  async (userID: string): Promise<WatchListItem[]> => {
    return client.getUserWatchList(userID);
  }
);

export const addToWatchList = createAsyncThunk<
  WatchListItem | undefined,
  { userID: string; anime: Anime; status: WatchStatus }
>("watchlist/addtouserwatchlist", async ({ userID, anime, status }) => {
  return client.addToWatchList(userID, anime, status);
});

export const updateWatchListEntry = createAsyncThunk<
  WatchListItem | undefined,
  { userID: string; anime: Anime; status: WatchStatus }
>("watchlist/updatewatchlistentry", async ({ userID, anime, status }) => {
  return client.updateWatchListEntry(userID, anime, status);
});

export const removeFromWatchList = createAsyncThunk<
  number | undefined,
  { userID: string; animeID: number }
>("watchlist/removefromuserwatchlist", async ({ userID, animeID }) => {
  return client.removeFromWatchList(userID, animeID);
});

// Slice
const watchListSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserWatchList.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getUserWatchList.fulfilled, (state, action) => {
        state.status = Status.Success;
        state.watchlist = action.payload;
      })
      .addCase(getUserWatchList.rejected, (state, action) => {
        state.status = Status.Error;
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(addToWatchList.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(addToWatchList.fulfilled, (state, action) => {
        state.status = Status.Success;
        if (action.payload)
          state.watchlist = [...state.watchlist, action.payload];
      })
      .addCase(addToWatchList.rejected, (state, action) => {
        state.status = Status.Error;
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(updateWatchListEntry.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(updateWatchListEntry.fulfilled, (state, action) => {
        state.status = Status.Success;
        if (action.payload) {
          state.watchlist = state.watchlist.map((item) => {
            if (action.payload && item.id === action.payload.id)
              return action.payload;
            return item;
          });
        }
      })
      .addCase(updateWatchListEntry.rejected, (state, action) => {
        state.status = Status.Error;
        state.error = action.error.message ?? "Unknown Error";
      })
      .addCase(removeFromWatchList.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(removeFromWatchList.fulfilled, (state, action) => {
        state.status = Status.Success;
        if (action.payload) {
          state.watchlist = state.watchlist.filter(
            (item) => item.id !== action.payload
          );
        }
      })
      .addCase(removeFromWatchList.rejected, (state, action) => {
        state.status = Status.Error;
        state.error = action.error.message ?? "Unknown Error";
      });
  },
});

// Selectors
export const selectWatchList = (state: RootState) => state.watchlist.watchlist;
export const selectWatchListError = (state: RootState) => state.watchlist.error;
export const selectWatchListStatus = (state: RootState) =>
  state.watchlist.status;

export default watchListSlice.reducer;
