import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerId: "",
  name: "",
  supplierId: "",
  supplierStoreLogo: "",
  supplierStoreName: "",
  storeCode: "",
};

export const customerSlice = createSlice({
  name: "customer",
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

export const { storeUserInfo, clearUser } = customerSlice.actions;

export default customerSlice.reducer;
