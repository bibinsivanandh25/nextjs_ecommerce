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
  addStoreFlag: false,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    storeUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    setAddStoreFlag: (state, action) => {
      return {
        ...state,
        addStoreFlag: action.payload.addStoreFlag,
      };
    },
    clearUser: () => {
      return initialState;
    },
  },
});

export const { storeUserInfo, clearUser, setAddStoreFlag } =
  customerSlice.actions;

export default customerSlice.reducer;
