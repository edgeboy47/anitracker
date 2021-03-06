import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import * as client from "../../api/firebase";
import { toast } from "react-toastify";


export interface UserInterface {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  createdAt: string;
  lastLoginAt: string;
}
interface AuthState {
  user: UserInterface | null;
  isLoading: boolean;
  isError: boolean;
  error: string;
  isSuccess: boolean;
}

const initialState: AuthState = {
  user: null, 
  isLoading: true,
  isError: false,
  isSuccess: false,
  error: "",
};

// Async thunks
type LoginCredentials = { email: string; password: string; username?: string };

export const register = createAsyncThunk<object, LoginCredentials>(
  "auth/register",
  async ({ email, password, username }): Promise<object> => {
    return client.register(email, password, username!);
  }
);

export const loginWithEmailAndPassword = createAsyncThunk<
  object,
  LoginCredentials
>(
  "auth/loginWithEmailAndPassword",
  async ({ email, password }): Promise<object> => {
    return client.loginInWithEmailAndPassword(email, password);
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async () => {
    return client.signInWithGoogle();
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const logout = client.logout();
  toast.success('Logged out successfully', {
    position: toast.POSITION.TOP_CENTER,
  })
  return logout;
});

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
    setUser: (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;
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
        state.user = action.payload as UserInterface;
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
        state.user = action.payload as UserInterface;
      })
      .addCase(loginWithEmailAndPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload as UserInterface;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
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

export const { reset, setUser } = authSlice.actions;
export default authSlice.reducer;
