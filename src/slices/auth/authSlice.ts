import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: null | { email: string; token: string };
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; token: string }>) => {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;