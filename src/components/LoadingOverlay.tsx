import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/store";

const mapStateToProps = function (state: RootState) {
    return {
        loading: state.loading,
    };
};

type LoadingOverlayProps = ReturnType<typeof mapStateToProps>;

class LoadingOverlay extends React.Component<LoadingOverlayProps> {
    render() {
        const isLoading = this.props.loading.isLoading;
        return (
            <>
                {isLoading ? (
                    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                ) : null}
                {this.props.children}
            </>
        );
    }
}

export default connect(mapStateToProps)(LoadingOverlay);
