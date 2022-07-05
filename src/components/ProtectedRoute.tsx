import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LeftBar from "./LeftBar";
import Navbar from "./Navbar";
import "./styles/bars.scss";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ErrorBoundary from "./ErrorBoundary";
import LoadingOverlay from "./LoadingOverlay";

interface ProtectedRouteProps {
    redirectPath: string;
    children?: Element;
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { redirectPath, children } = props;
    const [leftBarOpen, toggleLeftBarOpen] = useState(false);
    const location = useLocation();
    const user = useSelector((state: RootState) => state.user.value);
    if (!user) {
        if (location.pathname === "/") {
            return <Navigate to={"/landingPage"} replace />;
        }

        return <Navigate to={redirectPath} replace />;
    }

    return children ? (
        <>{children}</>
    ) : (
        <div className="app">
            <LoadingOverlay>
                <Navbar user={user} leftBarOpen={leftBarOpen} toggleLeftBarOpen={toggleLeftBarOpen} />
                <ErrorBoundary>
                    <div className="app-body">
                        <LeftBar leftBarOpen={leftBarOpen} />
                        <div className="mainDisplay">
                            <Outlet />
                        </div>
                    </div>
                </ErrorBoundary>
            </LoadingOverlay>
        </div>
    );
};
export default ProtectedRoute;
