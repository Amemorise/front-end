import { Alert, AlertTitle, Snackbar, Slide } from "@mui/material";
import React, { ErrorInfo } from "react";
import { connect } from "react-redux";
import { clearError, setError } from "../redux/error";
import { RootState } from "../redux/store";

const mapStateToProps = function (state: RootState) {
    return {
        error: state.error,
    };
};

const mapDispatchToProps = { setError, clearError };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type ErrorBoundaryProps = StateProps & DispatchProps;

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    componentDidCatch(error: Error, _errorInfo: ErrorInfo) {
        this.props.setError(error);
    }

    render() {
        const error = this.props.error.error;
        return (
            <>
                <Snackbar
                    open={!!error}
                    autoHideDuration={6000}
                    onClose={() => {
                        this.props.clearError();
                    }}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    TransitionComponent={(props) => <Slide {...props} direction="down" />}
                >
                    {error ? (
                        <Alert
                            onClose={() => {
                                this.props.clearError();
                            }}
                            severity="error"
                        >
                            <AlertTitle>Error - {error.name}</AlertTitle>
                            {error.message}
                        </Alert>
                    ) : (
                        <div></div>
                    )}
                </Snackbar>
                {this.props.children}
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
