import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { heroesApi } from "./services/heroesApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [heroesApi.reducerPath]: heroesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(heroesApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
