import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailId: "",
  firstName: "",
  lastName: "",
  profileImageUrl: "",
  supplierId: "",
  storeCode: "",
  isAddressSaved: false,
  unlockedTools: [
    "unlocktools",
    "single",
    "combo",
    "subscriptionhistory",
    "createluckydraw",
  ],
  storeName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearUser: () => {
      return initialState;
    },
    updateUnlockedTools: (state, action) => {
      return {
        ...state,
        unlockedTools: [...state.unlockedTools, ...action.payload],
      };
    },
  },
});

export const { storeUserInfo, clearUser, updateUnlockedTools } =
  userSlice.actions;

export default userSlice.reducer;
