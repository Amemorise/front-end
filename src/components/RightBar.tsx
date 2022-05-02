import React from "react";
import { MOBILE_BREAKPOINT } from "../helpers/constants";
import FriendsComponent from "./FriendsComponent";
import "./styles/bars.scss";

export const RightBar = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
    const breakpoint = MOBILE_BREAKPOINT;

    React.useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);
    if (width < breakpoint) {
        return null;
    }

    return (
        <div className="rightBar">
            <FriendsComponent />
        </div>
    );
};
