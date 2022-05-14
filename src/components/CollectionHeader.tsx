import { Verified, Lock } from "@mui/icons-material";
import { Avatar, Rating } from "@mui/material";
import { PublishedCollectionMetaData } from "../helpers/baseTypes";
import { convertToDateString } from "../helpers/helpers";
import "./styles/collection-header.scss";

const CollectionHeader = ({ collectionMetaData }: { collectionMetaData: PublishedCollectionMetaData }) => {
    const { title, verified, createdBy, creationDate, rating } = collectionMetaData;
    return (
        <div className="header">
            <h2>
                {title}
                {collectionMetaData.private ? <Lock fontSize={"small"} /> : null}
                {verified ? <Verified color={"primary"} fontSize={"small"} /> : null}
            </h2>

            <span className="created-by-span d-flex text-muted">
                <Avatar alt={createdBy.displayName} sx={{ width: "24px", height: "24px" }} sizes={"small"} src={createdBy.photoURL} />
                <small> by {createdBy.displayName}</small>
                <small> {convertToDateString(creationDate)}</small>
            </span>

            {collectionMetaData.private ? null : (
                <span className="ratings-span d-flex text-muted">
                    <Rating value={rating.value} size={"small"} />
                    <small>{rating.raterCount} ratings</small>
                </span>
            )}
        </div>
    );
};

export default CollectionHeader;
