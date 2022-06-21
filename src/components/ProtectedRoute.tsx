import { User } from "../helpers/baseTypes";
import { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LeftBar from "./LeftBar";
import Navbar from "./Navbar";
import FABButton from "./FABButton";
import { Add } from "@mui/icons-material";
import "./styles/bars.scss";

interface ProtectedRouteProps {
    user?: User;
    redirectPath: string;
    children?: Element;
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { user, redirectPath, children } = props;
    const [leftBarOpen, toggleLeftBarOpen] = useState(false);
    const location = useLocation();
    const createScreen = location.pathname.includes("/collections/");
    console.log("here");
    console.log(document.cookie);

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
            <Navbar user={user} leftBarOpen={leftBarOpen} toggleLeftBarOpen={toggleLeftBarOpen} />
            <div className="app-body">
                <LeftBar leftBarOpen={leftBarOpen} />
                <div className="mainDisplay">
                    <Outlet />
                    {!createScreen ? <FABButton className={"add-button"} icon={<Add />} url="/collections/create" title="Create Collection" /> : null}
                </div>
            </div>
        </div>
    );
};
export default ProtectedRoute;
