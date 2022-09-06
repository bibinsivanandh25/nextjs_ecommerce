import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
  variationData: {},
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    storeproductInfo: (state, action) => {
      return action.payload;
    },
    clearProduct: () => {
      return {
        formData: {},
        variationData: {},
      };
    },
  },
});

export const { storeproductInfo, clearProduct } = productSlice.actions;

export default productSlice.reducer;
