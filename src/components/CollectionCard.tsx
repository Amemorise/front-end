import { Lock, Verified } from "@mui/icons-material";
import { PublishedCollection } from "../helpers/baseTypes";
import { Avatar, Paper } from "@mui/material";
import { convertToDateString } from "../helpers/helpers";

const CollectionCard = (collection: PublishedCollection) => {
    console.log(collection);
    const { title, verified, createdBy, creationDate, description } = collection.collectionMetaData;
    const isPrivate = collection.collectionMetaData.private;
    const dateCreated = creationDate ? convertToDateString(creationDate) : undefined;
    return (
        <Paper className="card" variant="outlined" sx={{ borderRadius: "1rem" }}>
            <div className="card-image">
                <img src={collection.cards[0].photoURL} className="img-fluid rounded-start underlay-image" alt="..." />
                <img src={collection.cards[1].photoURL} className="img-fluid rounded-start overlay-image" alt="..." />
            </div>
            <div className="card-details">
                <span className="d-flex">
                    <h4 className="card-title m0">{title}</h4>
                    {isPrivate ? <Lock sx={{ fontSize: "14px" }} /> : null}
                    {verified ? <Verified color="primary" sx={{ fontSize: "14px" }} /> : null}
                </span>
                <div className="card-body">
                    <p className="card-text m0">{description}</p>
                </div>
                <div className={"card-summary"}>
                    {createdBy ? (
                        <div className={"d-flex"}>
                            <Avatar alt={createdBy.displayName} src={createdBy.photoURL} sx={{ width: 40, height: 40 }} />
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
