import { createSlice } from "@reduxjs/toolkit";
import { User } from "../helpers/baseTypes";

export type UserState = User | null;
export const userSlice = createSlice({
    name: "user",
    initialState: { value: null as UserState },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
