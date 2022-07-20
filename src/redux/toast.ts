import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export interface ToastType {
    type: AlertColor | undefined;
    message: string | undefined;
}

export const toastSlice = createSlice({
    name: "toast",
    initialState: {
        type: undefined,
        message: undefined,
    } as ToastType,
    reducers: {
        setToast: (state, action) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        clearToast: (state) => {
            state.type = undefined;
            state.message = undefined;
        },
    },
});

export const { setToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
