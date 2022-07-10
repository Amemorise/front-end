import { Alert, AlertTitle, Snackbar, Slide } from "@mui/material";
import React from "react";
import { ErrorType } from "../redux/error";

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
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        this.setState({ hasError: true, error: { name: error.name, message: errorInfo.componentStack } });
    }

    render() {
        const { error, hasError } = this.state;
        return (
            <>
                <Snackbar
                    open={hasError}
                    autoHideDuration={6000}
                    onClose={() => {
                        this.setState({ hasError: false, error: null });
                    }}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                    TransitionComponent={(props) => <Slide {...props} direction="down" />}
                >
                    {hasError ? (
                        <Alert
                            onClose={() => {
                                this.setState({ hasError: false, error: null });
                            }}
                            severity="error"
                        >
                            <AlertTitle>Error - {error?.name || "Error"}</AlertTitle>
                            {error?.message || "Something went wrong"}
                        </Alert>
                    ) : (
                        <div>here</div>
                    )}
                </Snackbar>
                {!hasError ? this.props.children : null}
            </>
        );
    }
}

export default ErrorBoundary; //connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary     );
