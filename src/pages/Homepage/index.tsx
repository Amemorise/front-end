import SummaryBanner from "./components/SummaryBanner";
import { usePageTitle } from "../../helpers/helpers";
import "./styles/homepage.scss";
import FeaturedCategories from "./components/FeaturedCategories";
import RecentCollections from "./components/RecentCollections";
import NewCollections from "./components/NewCollections";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Homepage = () => {
    usePageTitle("Home");

    const user = useSelector((state: RootState) => state.user.value);
    return (
        <div className="homepage display-padding">
            {user ? (
                <>
                    <h2>Welcome, {user.displayName}!</h2>
                    <SummaryBanner user={user} />
                    <FeaturedCategories />
                    <NewCollections />
                    <RecentCollections />
                </>
            ) : null}
        </div>
    );
};

export default Homepage;
