import { User } from "../helpers/baseTypes";
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LeftBar from "./LeftBar";
import Navbar from "./Navbar";
import { RightBar } from "./RightBar";
import "./styles/bars.scss";
import AddCollectionButton from "./AddCollectionButton";

interface ProtectedRouteProps {
    user?: User;
    redirectPath: string;
    children?: Element;
}
const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { user, redirectPath, children } = props;
    const [leftBarOpen, toggleLeftBarOpen] = useState(true);

    if (!user) {
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
                    <AddCollectionButton />
                </div>
                <RightBar />
            </div>
        </div>
    );
};
export default ProtectedRoute;
