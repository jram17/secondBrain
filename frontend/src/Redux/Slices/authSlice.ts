import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  authenticated: boolean;
  accessToken: string;
}

const initialState: AuthState = {
  authenticated: false,
  accessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthentication: (state) => {
      state.authenticated = true; 
    },
    resetAuthentication: (state) => {
      state.authenticated = false; 
      state.accessToken = ""; 
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload; 
    },
  },
});

export const { setAuthentication, resetAuthentication, setAccessToken } =
  authSlice.actions;

export default authSlice.reducer;