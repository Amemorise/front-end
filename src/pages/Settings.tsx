import { useEffect } from "react";
import { setPageTitle } from "../helpers/helpers";

const Settings = () => {
    useEffect(() => setPageTitle("Settings"), []);
    return <div>Settings</div>;
};

export default Settings;
