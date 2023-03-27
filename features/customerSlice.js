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
  variationDetails: [],
  productId: "",
  cartCount: null,
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
        variationDetails: [...action.payload.variationDetails],
        productId: action.payload.productId,
      };
    },
    cartCount: (state, action) => {
      return {
        ...state,
        cartCount: action.payload.cartCount,
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
  cartCount,
} = customerSlice.actions;

export default customerSlice.reducer;
