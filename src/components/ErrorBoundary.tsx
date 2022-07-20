import { Alert, AlertTitle, Snackbar, Slide } from "@mui/material";
import React from "react";

interface ErrorBoundaryState {
    error: Error | null;
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
