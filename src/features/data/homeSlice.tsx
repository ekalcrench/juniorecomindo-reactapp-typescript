import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface HomeSlice {
  dataCurrentPage: any[];
  dataNextPage: any[];
  loading: boolean;
}

// Define the initial state using that type
const initialState: HomeSlice = {
  dataCurrentPage: [],
  dataNextPage: [],
  loading: true,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setDataCurrentPage: (state, action: PayloadAction<any>) => {
      state.dataCurrentPage = [...state.dataCurrentPage, ...action.payload];
      console.log("state.dataCurrentPage : ", state.dataCurrentPage);
    },
    setDataNextPage: (state, action: PayloadAction<any>) => {
      state.dataNextPage = action.payload;
      console.log("state.dataNextPage : ", state.dataNextPage);
    },
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
      console.log("state.loading : ", state.loading);
    },
  },
});

export const { setDataCurrentPage, setDataNextPage, setLoading } = homeSlice.actions;

export default homeSlice.reducer;
