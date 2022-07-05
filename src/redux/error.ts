import { createSlice } from "@reduxjs/toolkit";

export type ErrorType = Error | null;

export const errorSlice = createSlice({
    name: "error",
    initialState: {
        error: null as ErrorType,
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
