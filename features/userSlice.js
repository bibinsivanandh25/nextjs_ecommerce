import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailId: "",
  firstName: "",
  lastName: "",
  profileImageUrl: "",
  supplierId: "",
  storeCode: "",
  isAddressSaved: false,
  unlockedTools: [],
  storeName: "",
  allowedPath: [],
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
        unlockedTools: [
          ...new Set([...state.unlockedTools, ...action.payload]),
        ],
      };
    },
    setAllowedPaths: (state, action) => {
      return {
        ...state,
        allowedPath: [...action.payload],
      };
    },
  },
});

export const {
  storeUserInfo,
  clearUser,
  updateUnlockedTools,
  setAllowedPaths,
} = userSlice.actions;

export default userSlice.reducer;
