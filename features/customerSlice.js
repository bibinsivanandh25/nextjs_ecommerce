import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  name: "",
  supplierId: "",
  supplierStoreLogo: "",
  supplierStoreName: "",
  storeCode: "",
  shopDescription: "",
  shopDescriptionImageUrl: "",
  role: "",
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { storeUserInfo, clearUser } = customerSlice.actions;

export default customerSlice.reducer;
