import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailId: "",
  firstName: "",
  lastName: "",
  profileImageUrl: "",
  supplierId: "",
  storeCode: "",
  isAddressSaved: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      return action.payload;
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { storeUserInfo, clearUser } = userSlice.actions;

export default userSlice.reducer;
