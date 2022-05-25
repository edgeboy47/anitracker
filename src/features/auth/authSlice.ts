import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { RootState } from "../../app/store";
import * as client from "../../api/firebase";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
  isSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: "",
};

// Async thunks
type LoginCredentials = { email: string; password: string };

export const register = createAsyncThunk<User, LoginCredentials>(
  "auth/register",
  async ({ email, password }): Promise<User> => {
    return client.register(email, password);
  }
);

export const loginWithEmailAndPassword = createAsyncThunk<
  User,
  LoginCredentials
>(
  "auth/loginWithEmailAndPassword",
  async ({ email, password }): Promise<User> => {
    return client.loginInWithEmailAndPassword(email, password);
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return client.logout();
})

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginWithEmailAndPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginWithEmailAndPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message!;
      });
  },
});

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthIsError = (state: RootState) => state.auth.isError;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthIsSuccess = (state: RootState) => state.auth.isSuccess;

export const { reset } = authSlice.actions;
export default authSlice.reducer;
