import { configureStore } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebaseConfig";

import animeReducer from "../features/anime/animeSlice";
import authReducer, { setUser, reset } from "../features/auth/authSlice";

const store = configureStore({
  reducer: {
    anime: animeReducer,
    auth: authReducer,
  },
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(setUser(user.toJSON()));
  } else {
    store.dispatch(setUser(null));
  }
  store.dispatch(reset());
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
