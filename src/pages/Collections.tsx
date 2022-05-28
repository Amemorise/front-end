import React from "react";
import CollectionsDisplay from "../components/CollectionsDisplay";
import { setPageTitle } from "../helpers/helpers";

const Collections = () => {
    React.useEffect(() => setPageTitle("Collections"), []);
    return (
        <div>
            <CollectionsDisplay />
        </div>
    );
};

export default Collections;
