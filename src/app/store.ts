import { configureStore } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebaseConfig";

import animeReducer from "../features/anime/animeSlice";
import authReducer, {
  setUser,
  reset,
  UserInterface,
} from "../features/auth/authSlice";
import watchListReducer from "../features/watchlist/watchlistSlice";
import { animeApiSlice } from "../features/anime/animeAPISlice";

const store = configureStore({
  reducer: {
    anime: animeReducer,
    [animeApiSlice.reducerPath]: animeApiSlice.reducer,
    auth: authReducer,
    watchlist: watchListReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(animeApiSlice.middleware);
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
