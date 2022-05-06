import { useEffect } from "react";
import { setPageTitle } from "../helpers/helpers";

const MyProfile = () => {
    useEffect(() => setPageTitle("Profile"), []);
    return <div>MyProfile</div>;
};

export default MyProfile;
