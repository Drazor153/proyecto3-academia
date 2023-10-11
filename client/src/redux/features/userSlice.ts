import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/types";

const initialState: User = {
  run: -1,
  dv: "",
  name: "",
  first_surname: "",
  email: null,
  role: "STUDENT",
  status: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => {
      return action.payload;
    }
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
