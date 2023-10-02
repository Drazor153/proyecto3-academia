import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  run: 87654321,
  name: "User",
  role: "SUPERUSER",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    swaptype: (state) => {
      if (state.role === "SUPERUSER") {
        state.role = "STUDENT";
        state.run = 12345678;
      } else {
        state.role = "SUPERUSER";
        state.run = 87654321;
      }
    }
  },
});

export default userSlice.reducer;
export const { swaptype } = userSlice.actions;
