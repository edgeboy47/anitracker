import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as client from "../../api/firebase";
import { WatchListItem } from "../../api/firebase";
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
      });
  },
});

// Selectors

export const selectWatchList = (state: RootState) => state.watchlist.watchlist;
export const selectWatchListError = (state: RootState) => state.watchlist.error;
export const selectWatchListStatus = (state: RootState) =>
  state.watchlist.status;

export default watchListSlice.reducer;
