import { useEffect } from "react";
import CollectionCard from "../components/CollectionCard";
import SummaryBanner from "../components/SummaryBanner";
import ViewMoreButton from "../components/ViewMoreButton";
import { TEST_USER } from "../helpers/constants";
import { setPageTitle } from "../helpers/helpers";
import "./styles/homepage.scss";

const Homepage = () => {
    useEffect(() => setPageTitle("Home"), []);

    return (
        <div>
            <SummaryBanner />

            <div className="homepage-content">
                <div className={"homepage-cards"}>
                    Recent
                    <div className="slider">
                        <div className={"slides"}>
                            <div className={"cards-list"}>
                                <CollectionCard title={"Recent Card"} isPrivate lastAccessedDate={1394104654} percentComplete={80} />
                                <CollectionCard title={"Recent Card"} lastAccessedDate={1394104654} percentComplete={80} />
                                <CollectionCard title={"Recent Card"} isPrivate lastAccessedDate={1394104654} percentComplete={80} />
                                <ViewMoreButton />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"homepage-cards"}>
                    Discover
                    <div className="slider">
                        <div className={"slides"}>
                            <div className={"cards-list"}>
                                <CollectionCard title={"Discover Card"} ratingValue={4} isVerified={true} createdBy={TEST_USER} />
                                <ViewMoreButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
