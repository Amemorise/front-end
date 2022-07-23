import SummaryBanner from "./components/SummaryBanner";
import { usePageTitle } from "../../helpers/helpers";
import "./styles/homepage.scss";
import FeaturedCategories from "./components/FeaturedCategories";
import RecentCollections from "./components/RecentCollections";
import NewCollections from "./components/NewCollections";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    usePageTitle("Home");
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.user.value);
    if (!user) {
        navigate("/login");
        return <></>;
    }
    return (
        <div className="homepage display-padding">
            <Stack spacing={3}>
                <Typography variant={"h4"}>Welcome, {user.displayName}!</Typography>
                <SummaryBanner user={user} />
                <FeaturedCategories />
                <NewCollections />
                <RecentCollections />
            </Stack>
        </div>
    );
};

export default Homepage;
