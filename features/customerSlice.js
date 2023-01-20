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
  productId: "",
  variationDetails: [],
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
    productDetails: (state, action) => {
      return {
        ...state,
        productId: action.payload.productId,
        variationDetails: [...action.payload.variationDetails],
      };
    },
    clearCustomerSlice: () => {
      return {
        ...initialState,
      };
    },
  },
});

export const {
  storeUserInfo,
  clearCustomerSlice,
  setAddStoreFlag,
  productDetails,
} = customerSlice.actions;

export default customerSlice.reducer;
