import { configureStore } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebaseConfig";

import animeReducer from "../features/anime/animeSlice";
import authReducer, { setUser, reset, UserInterface } from "../features/auth/authSlice";
import watchListReducer from "../features/watchlist/watchlistSlice";

const store = configureStore({
  reducer: {
    anime: animeReducer,
    auth: authReducer,
    watchlist: watchListReducer,
  },
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(setUser(user.toJSON() as UserInterface));
  } else {
    store.dispatch(setUser(null));
  }
  store.dispatch(reset());
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
