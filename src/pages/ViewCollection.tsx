import { DUMMY_COLLECTION } from "../helpers/constants";
import { Start } from "@mui/icons-material";
import { Button, Chip, Divider } from "@mui/material";
import SocialMediaShare from "../components/SocialMediaShare";
import "./styles/view-collection.scss";
import CoverImages from "../components/CoverImages";
import { useState } from "react";
import CardViews from "../components/CardViews";
import _ from "lodash";
import CollectionHeader from "../components/CollectionHeader";
import { useLocation } from "react-router-dom";
import { LocationState, PublishedCollection } from "../helpers/baseTypes";

const ViewCollection = () => {
    const [learningMode, setLearningMode] = useState(false);

    const commonSharedConfig = {
        url: window.location.href,
    };
    const collection: PublishedCollection = (useLocation().state as LocationState)?.collection || DUMMY_COLLECTION;

    const { collectionMetaData, cards } = collection;
    const { description, tags, prompt } = collectionMetaData;
    const coverImages = cards.map((card) => card.photoURL);

    return (
        <div className="view-collection display-padding">
            {learningMode ? (
                <CardViews cards={_.shuffle(cards)} prompt={prompt} collectionMetaData={collectionMetaData} />
            ) : (
                <>
                    <div className="collection-metadata d-flex">
                        <CollectionHeader collectionMetaData={collectionMetaData} />
                        <Divider>
                            <SocialMediaShare {...commonSharedConfig} />
                        </Divider>

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
                    <div className="start-button">
                        <Button onClick={() => setLearningMode(!learningMode)} variant="contained" sx={{ borderRadius: "20px" }} color={"success"} endIcon={<Start />}>
                            Start
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewCollection;
