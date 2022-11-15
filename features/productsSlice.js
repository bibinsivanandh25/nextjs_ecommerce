import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
  variationData: {},
  editProduct: false,
  duplicateFlag: false,
  productDetails: {},
  viewFlag: false,
  adminView: false,
  list: [],
  showExtraTabs: false,
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
    viewProduct: (state, action) => {
      return {
        ...state,
        viewFlag: true,
        productDetails: { ...action.payload },
      };
    },

    resetAfterView: (state) => {
      return {
        ...state,
        viewFlag: false,
        productDetails: {},
      };
    },
    adminProductView: (state, action) => {
      return {
        ...state,
        viewFlag: true,
        adminView: true,
        productDetails: { ...action.payload.data },
        list: [...action.payload.list],
        showExtraTabs: action.payload.showExtraTabs,
      };
    },
    resetAdminProductView: (state) => {
      return {
        ...state,
        viewFlag: false,
        adminView: false,
        productDetails: {},
        list: [],
        showExtraTabs: false,
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
  viewProduct,
  resetAfterView,
  adminProductView,
  resetAdminProductView,
} = productSlice.actions;

export default productSlice.reducer;
