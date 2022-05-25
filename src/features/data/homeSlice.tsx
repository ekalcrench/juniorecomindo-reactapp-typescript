import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface HomeSlice {
  dataCurrentPage: any[];
  dataNextPage: any[];
  dataStartRequest: number;
}

// Define the initial state using that type
const initialState: HomeSlice = {
  dataCurrentPage: [],
  dataNextPage: [],
  dataStartRequest: 8,
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
    setDataStartRequest: (state, action: PayloadAction<any>) => {
      state.dataStartRequest = state.dataStartRequest + action.payload;
      console.log("state.dataStartRequest : ", state.dataStartRequest);
    },
  },
});

export const { setDataCurrentPage, setDataNextPage, setDataStartRequest } =
  homeSlice.actions;

export default homeSlice.reducer;
