import { User } from "../helpers/baseTypes";
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LeftBar from "./LeftBar";
import Navbar from "./Navbar";
import { RightBar } from "./RightBar";

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
        <>children</>
    ) : (
        <>
            {/*Todo #change back for proper functioning*/}
            <Navbar user={user} leftBarOpen={leftBarOpen} toggleLeftBarOpen={toggleLeftBarOpen} />
            <div style={{ display: "flex", height: "calc(100vh - 64px" }}>
                <LeftBar leftBarOpen={leftBarOpen} />
                <div className="mainDisplay">
                    <Outlet />
                </div>
                <RightBar />
            </div>
        </>
    );
};
export default ProtectedRoute;
