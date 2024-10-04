import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { User } from "../types/User";

const token = localStorage.getItem("token") ?? "";

type AuthApiState = {
  token: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string | string[];
};

const initialState: AuthApiState = {
  token: token ? token : "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<void>) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(signup.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.token = "";
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = "";
      });
  },
});

export const signup = createAsyncThunk(
  "auth/signup",
  async (user: User, thunkAPI) => {
    try {
      return await authService.signup(user);
    } catch (error: any) {
      const errorMsg =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (user: User, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error: any) {
      const errorMsg =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
