import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
  variationData: {},
  editProduct: false,
  duplicateFlag: false,
  productDetails: {},
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storeproductInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearProduct: () => {
      return initialState;
    },
    updateProduct: (state, action) => {
      return {
        ...state,
        editProduct: true,
        productDetails: { ...action.payload },
      };
    },
    resetAfterupdate: (state) => {
      return {
        ...state,
        editProduct: false,
        productDetails: {},
      };
    },
    duplicateProduct: (state, action) => {
      return {
        ...state,
        duplicateFlag: true,
        productDetails: { ...action.payload },
      };
    },
    resetAfterDuplicate: (state) => {
      return {
        ...state,
        duplicateFlag: false,
        productDetails: {},
      };
    },
  },
});

export const {
  storeproductInfo,
  clearProduct,
  updateProduct,
  resetAfterupdate,
  duplicateProduct,
  resetAfterDuplicate,
} = productSlice.actions;

export default productSlice.reducer;
