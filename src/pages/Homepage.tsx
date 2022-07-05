import { useEffect } from "react";
import SummaryBanner from "../components/SummaryBanner";
import { setPageTitle } from "../helpers/helpers";
import "./styles/homepage.scss";
import FeaturedCategories from "../components/FeaturedCategories";
import RecentCollections from "../components/RecentCollections";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Homepage = () => {
    useEffect(() => setPageTitle("Home"), []);

    const user = useSelector((state: RootState) => state.user.value);
    return (
        <div className="homepage display-padding">
            {user ? (
                <>
                    <h2>Welcome, {user.displayName}!</h2>
                    <SummaryBanner user={user} />
                    <FeaturedCategories />
                    <RecentCollections />
                    <RecentCollections />
                </>
            ) : null}
        </div>
    );
};

export default Homepage;
