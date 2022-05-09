import { useParams } from "react-router-dom";
import { DUMMY_COLLECTION } from "../helpers/constants";
import { Lock, PlayArrowOutlined, Verified } from "@mui/icons-material";
import { Avatar, Button, Chip, Rating } from "@mui/material";
import { convertToDateString } from "../helpers/helpers";

const ViewCollection = () => {
    const { id } = useParams();
    console.log(id);
    const collection = DUMMY_COLLECTION;

    const { collectionMetaData, cards } = collection;
    const { title, verified, createdBy, creationDate, description, tags, rating } = collectionMetaData;
    return (
        <div className="view-collection display-padding">
            <div className="collection-metadata d-flex" style={{ flexDirection: "column" }}>
                <h2>
                    {title}
                    {"  "}
                    {collectionMetaData.private ? <Lock fontSize={"small"} /> : null}
                    {"  "}
                    {verified ? <Verified color={"primary"} fontSize={"small"} /> : null}
                </h2>
                {description}
                <Button sx={{ margin: "1rem 0" }} variant="outlined" color="success" endIcon={<PlayArrowOutlined />}>
                    Start
                </Button>
                <span className="d-flex text-muted">
                    <Avatar alt={createdBy.displayName} sx={{ width: "24px", height: "24px" }} sizes={"small"} src={createdBy.photoURL}>
                        {createdBy.displayName}
                    </Avatar>
                    <p> by {createdBy.displayName}</p>
                    <small> {convertToDateString(creationDate)}</small>
                </span>

                <span className="collection-tags">
                    {tags.map((tag) => {
                        return <Chip key={tag} label={tag} variant="outlined" />;
                    })}
                </span>
                {collectionMetaData.private ? null : (
                    <span>
                        <Rating value={rating.value} size={"small"} />
                        <small>{rating.raterCount} ratings</small>
                    </span>
                )}
                <p>{cards.length} cards</p>
                <p></p>
            </div>
        </div>
    );
};

export default ViewCollection;
