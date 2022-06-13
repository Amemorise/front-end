import React from "react";
import RecentCollections from "../components/RecentCollections";
import { setPageTitle } from "../helpers/helpers";
import "./styles/review-collection.scss";

const Collections = () => {
    React.useEffect(() => setPageTitle("Collections"), []);
    return (
        <div className="display-padding">
            <RecentCollections />
            <RecentCollections />
            <RecentCollections />
        </div>
    );
};

export default Collections;
