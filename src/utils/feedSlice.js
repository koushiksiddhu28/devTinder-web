import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUserFeed: (state, action) => {
      const newUser = state.filter((user) => user._id !== action.payload);
      return newUser;
    },
    removeFeed: () => null,
  },
});

export const { addFeed, removeUserFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
