import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LeftBar from "./LeftBar";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ErrorBoundary from "./ErrorBoundary";
import LoadingOverlay from "./LoadingOverlay";
import { isFirstTimeGuest } from "../helpers/helpers";
import "./styles/bars.scss";

interface ProtectedRouteProps {
    children?: Element;
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { children } = props;
    const location = useLocation();
    const [leftBarOpen, toggleLeftBarOpen] = useState(false);

    const user = useSelector((state: RootState) => state.user.value);
    if (!user) {
        if (isFirstTimeGuest()) {
            return <Navigate to={"/landingPage"} replace />;
        }

        return <Navigate to={"/login"} replace />;
    }

    if (location.pathname === "/") {
        return <Navigate to={"/home"} replace />;
    }

    return children ? (
        <>{children}</>
    ) : (
        <ErrorBoundary>
            <div className="app">
                <LoadingOverlay>
                    <Navbar user={user} leftBarOpen={leftBarOpen} toggleLeftBarOpen={toggleLeftBarOpen} />

                    <div className="app-body">
                        <LeftBar leftBarOpen={leftBarOpen} />
                        <div className="mainDisplay">
                            <Outlet />
                        </div>
                    </div>
                </LoadingOverlay>
            </div>
        </ErrorBoundary>
    );
};
export default ProtectedRoute;
