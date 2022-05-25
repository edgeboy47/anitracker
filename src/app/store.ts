import { configureStore } from "@reduxjs/toolkit";

import animeReducer from "../features/anime/animeSlice";
import authReducer from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    anime: animeReducer,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
