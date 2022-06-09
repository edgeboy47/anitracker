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
        state.error = action.error.message!;
      })
      .addCase(addToWatchList.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(addToWatchList.fulfilled, (state, action) => {
        state.status = Status.Success;
        // TODO add item to watchlist if added successfully
        if (action.payload)
          state.watchlist = [...state.watchlist, action.payload];
      })
      .addCase(addToWatchList.rejected, (state, action) => {
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