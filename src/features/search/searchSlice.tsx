import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SearchSlice {
  dataSearch : any[],
}

// Define the initial state using that type
const initialState: SearchSlice = {
  dataSearch: [],
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setDataSearch: (state, action: PayloadAction<any>) => {
      state.dataSearch = action.payload;
    }
  },
});

export const { setDataSearch} = searchSlice.actions;

export default searchSlice.reducer;
