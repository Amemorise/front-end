import React from "react";
import { setPageTitle } from "../helpers/helpers";

const Collections = () => {
    React.useEffect(() => setPageTitle("Collections"), []);
    return <div>Collections</div>;
};

export default Collections;
