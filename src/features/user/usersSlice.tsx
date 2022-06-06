import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UsersSlice {
  isLoggedIn: boolean;
  email: string;
  password: string;
}

// Define the initial state using that type
const initialState: UsersSlice = {
  isLoggedIn: false,
  email: "",
  password: "",
};

export const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLogin: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
      window.localStorage.setItem("user", JSON.stringify(state));
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
      state.password = "";
      localStorage.clear();
    },
    getUser: (state) => {
      const getItem = window.localStorage.getItem("user");
      if (getItem) {
        const user = JSON.parse(getItem);
        state.isLoggedIn = user.isLoggedIn;
        state.email = user.email;
        state.password = user.password;
        console.log("User : ", user);
      }
    },
  },
});

export const { setLogin, setLogout, getUser } = usersSlice.actions;

export default usersSlice.reducer;
