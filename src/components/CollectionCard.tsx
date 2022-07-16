import { Lock, Verified } from "@mui/icons-material";
import { PublishedCollection } from "../helpers/baseTypes";
import { Avatar, Paper, Typography } from "@mui/material";
import { convertToDateString, isNewCollection } from "../helpers/helpers";
import "./styles/card.scss";

const CollectionCard = (collection: PublishedCollection) => {
    const { title, verified, createdBy, creationDate, description } = collection.collectionMetaData;
    const isPrivate = collection.collectionMetaData.private;
    const dateCreated = convertToDateString(creationDate);
    const newCollection = isNewCollection(creationDate);
    return (
        <Paper className="card" variant="outlined" sx={{ borderRadius: "1rem" }}>
            <div className="card-image">
                <img src={collection.cards[0].photoURL} className="img-fluid rounded-start underlay-image" alt="..." />
                <img src={collection.cards[1].photoURL} className="img-fluid rounded-start overlay-image" alt="..." />
            </div>
            <div className="card-details">
                <span className="d-flex">
                    <Typography variant={"h6"} className="card-title m0">
                        {title}
                    </Typography>
                    {isPrivate ? <Lock sx={{ fontSize: "14px" }} /> : null}
                    {verified ? <Verified color="primary" sx={{ fontSize: "14px" }} /> : null}
                    {newCollection ? <span className="live-button blink">NEW</span> : null}
                </span>
                <div className="card-body">
                    <Typography variant={"body1"} className="card-text m0">
                        {description}
                    </Typography>
                </div>
                <div className={"card-summary"}>
                    {createdBy ? (
                        <div className={"d-flex"}>
                            <Avatar
                                alt={createdBy.displayName}
                                src={createdBy.photoURL}
                                sx={{ width: 40, height: 40 }}
                            />
                            <span>
                                <h5 className="text-muted m0"> {createdBy.displayName}</h5>
                                {dateCreated ? (
                                    <div className="text-muted">
                                        <small>
                                            <em>Created {dateCreated}</em>
                                        </small>
                                    </div>
                                ) : null}
                                {/* {rating.value ? <Rating size={"small"} readOnly value={rating.value} /> : null} */}
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
        </Paper>
    );
};

export default CollectionCard;
