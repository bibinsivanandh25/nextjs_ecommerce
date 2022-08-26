import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailId: "",
  firstName: "",
  lastName: "",
  profileImageUrl: "",
  supplierId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { storeUserInfo } = userSlice.actions;

export default userSlice.reducer;
