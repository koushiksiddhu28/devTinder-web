import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addrequests: (state, action) => action.payload,
  },
});

export const { addrequests } = requestSlice.actions;
export default requestSlice.reducer;
