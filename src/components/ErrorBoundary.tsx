import { Alert, AlertTitle, Snackbar, Slide } from "@mui/material";
import React, { ErrorInfo } from "react";
import { connect } from "react-redux";
import { clearError, ErrorType, setError } from "../redux/error";
import { RootState } from "../redux/store";

// const mapStateToProps = function (state: RootState) {
//     return {
//         error: state.error,
//     };
// };

// const mapDispatchToProps = { setError, clearError };

// type StateProps = ReturnType<typeof mapStateToProps>;
// type DispatchProps = typeof mapDispatchToProps;

// type ErrorBoundaryProps = StateProps & DispatchProps;

interface ErrorBoundaryState {
    error: ErrorType;
    hasError: boolean;
}
class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(_error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        const { error, hasError } = this.state;
        return (
            <>
                <Snackbar
                    open={hasError}
                    autoHideDuration={6000}
                    // onClose={() => {
                    //     this.props.clearError();
                    // }}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    TransitionComponent={(props) => <Slide {...props} direction="down" />}
                >
                    {error ? (
                        <Alert
                            // onClose={() => {
                            //     this.props.clearError();
                            // }}
                            severity="error"
                        >
                            <AlertTitle>Error - {error.name}</AlertTitle>
                            {error.message}
                        </Alert>
                    ) : (
                        <div>here</div>
                    )}
                </Snackbar>
                {this.props.children}
            </>
        );
    }
}

export default ErrorBoundary; //connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary     );
