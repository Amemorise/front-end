import { Snackbar, Alert } from "@mui/material";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearToast } from "../redux/toast";

const AlertToast = () => {
    const toast = useSelector((state: RootState) => state.toast);
    const dispatch = useDispatch();
    const handleCloseToast = () => {
        dispatch(clearToast());
    };
    return (
        <Snackbar
            open={!!toast.message}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            onClose={handleCloseToast}
            autoHideDuration={4000}
        >
            <Alert variant={"filled"} onClose={handleCloseToast} severity={toast.type} sx={{ width: "100%" }}>
                {toast.message}
            </Alert>
        </Snackbar>
    );
};

export default AlertToast;
