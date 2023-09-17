import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload?.user;
      state.isLoading = action.payload?.isLoading;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
