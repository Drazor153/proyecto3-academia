import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/types";

const initialState: User = {
  run: -1,
  dv: "",
  name: "",
  first_surname: "",
  email: null,
  role: "",
  status: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => {
      return action.payload;
    },
    logout: () => initialState,
  },
});

export default userSlice.reducer;
export const { setUser, logout } = userSlice.actions;
