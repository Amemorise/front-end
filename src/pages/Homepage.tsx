import { useEffect } from "react";
import CollectionCard from "../components/CollectionCard";
import SummaryBanner from "../components/SummaryBanner";
import FABButton from "../components/FABButton";
import { DUMMY_USER } from "../helpers/constants";
import { setPageTitle } from "../helpers/helpers";
import "./styles/homepage.scss";
import { ChevronRight } from "@mui/icons-material";
import FeaturedCategories from "../components/FeaturedCategories";
import RecentCollections from "../components/RecentCollections";

const Homepage = () => {
    useEffect(() => setPageTitle("Home"), []);

    return (
        <div className="homepage display-padding">
            <h2>Welcome, Kofi!</h2>
            <SummaryBanner />
            <FeaturedCategories />
            <RecentCollections />
            <RecentCollections />
        </div>
    );
};

export default Homepage;
