import { DUMMY_COLLECTION } from "../helpers/constants";
import { Chip, Divider } from "@mui/material";
import SocialMediaShare from "../components/SocialMediaShare";
import "./styles/view-collection.scss";
import CoverImages from "../components/CoverImages";
import CollectionHeader from "../components/CollectionHeader";
import { useLocation } from "react-router-dom";
import { LocationState, PublishedCollection } from "../helpers/baseTypes";
import StartQuizButton from "../components/StartQuizButton";
import CollectionSummary from "../components/CollectionSummary";

const ViewCollection = () => {
    const commonSharedConfig = {
        url: window.location.href,
    };
    const collection: PublishedCollection = (useLocation().state as LocationState)?.collection || DUMMY_COLLECTION;

    const { collectionMetaData, cards } = collection;
    const { description, tags } = collectionMetaData;
    const coverImages = cards.map((card) => card.photoURL);

    return (
        <div className="view-collection display-padding">
            <div className="collection-metadata d-flex">
                <CollectionHeader collectionMetaData={collectionMetaData} />
                <Divider>
                    <SocialMediaShare {...commonSharedConfig} />
                </Divider>
                <CollectionSummary cards={cards} />
                <StartQuizButton titleText="Start" collection={collection} />
                <Divider />
                <CoverImages images={coverImages} />
                <p className="collection-description">{description}</p>
                {/* <Button sx={{ margin: "1rem 0" }} variant="outlined" color="success" endIcon={<PlayArrowOutlined />}>
                    Start
                </Button> */}
                <span className="collection-tags">
                    {tags.map((tag) => {
                        return <Chip key={tag} label={tag} variant="outlined" />;
                    })}
                </span>
            </div>
        </div>
    );
};

export default ViewCollection;
