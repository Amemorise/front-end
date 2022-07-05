import { createSlice } from "@reduxjs/toolkit";

export type LoadingState = boolean;
export const loadingSlice = createSlice({
    name: "loading",
    initialState: { isLoading: false },
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { setIsLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
