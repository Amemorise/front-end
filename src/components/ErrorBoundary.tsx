import { Alert, AlertTitle, Snackbar, Slide } from "@mui/material";
import React, { ErrorInfo } from "react";
import { connect } from "react-redux";
import { clearError, ErrorType, setError } from "../redux/error";
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

interface ErrorBoundaryState {
    error: ErrorType | undefined;
}
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: undefined };
    }
    componentDidCatch(error: any, _errorInfo: ErrorInfo) {
        this.props.setError({ name: "Error", message: JSON.stringify(error) });
    }
    static getDerivedStateFromError(error: any) {
        return { error: { name: "Error", message: JSON.stringify(error) } };
    }

    componentDidMount() {
        this.setState({ error: this.props.error.error });
    }
    render() {
        const error = this.state.error;
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
