import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import usersSlice from "../features/lainnya/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {counter: counterReducer}
export type AppDispatch = typeof store.dispatch
