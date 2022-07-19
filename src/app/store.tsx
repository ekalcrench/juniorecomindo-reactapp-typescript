import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "../features/data/homeSlice";
import searchSlice from "../features/search/searchSlice";
import usersSlice from "../features/user/usersSlice";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";

// const persistConfig: any = {
//   key: "root",
//   transforms: [
//     encryptTransform({
//       secretKey: "my-super-secret-key",
//       onError: function (error) {
//         // Handle the error.
//         console.log("error : ", error);
//       },
//     }),
//   ],
//   storage: storage
// };

// export const persistedReducer = persistReducer(persistConfig, usersSlice);

export const store = configureStore({
  reducer: {
    users: usersSlice,
    search: searchSlice,
    home: homeSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: counterReducer}
export type AppDispatch = typeof store.dispatch;
