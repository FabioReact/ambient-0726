import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../../app/store";

// Le store sur redux représente un état global à notre application
// Ce store sera décomposé en plusieurs parts (slices)

// Define a type for the slice state
export interface UserState {
  email: string;
  accessToken: string;
  isConnected: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
  email: "",
  accessToken: "secret",
  isConnected: false,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<{ email: string; accessToken: string }>) => {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.isConnected = true;
    },
    logoutUser: (state) => {
      state.email = "";
      state.accessToken = "";
      state.isConnected = false;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
