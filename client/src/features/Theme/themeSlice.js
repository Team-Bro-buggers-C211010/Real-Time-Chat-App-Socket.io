import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("chat-theme") || "coffee";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: initialTheme,
  },
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem("chat-theme", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;