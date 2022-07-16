import React from "react";
import RecentCollections from "../components/RecentCollections";
import { usePageTitle } from "../helpers/helpers";
import "./styles/review-collection.scss";

const Collections = () => {
    usePageTitle("Collections");
    return (
        <div className="display-padding">
            <RecentCollections />
            <RecentCollections />
            <RecentCollections />
        </div>
    );
};

export default Collections;
