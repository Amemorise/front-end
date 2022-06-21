import { Lock, Verified } from "@mui/icons-material";
import { User } from "../helpers/baseTypes";
import { Avatar, Rating, Paper } from "@mui/material";
import "./styles/card.scss";
import { convertToDateString } from "../helpers/helpers";

interface CollectionCardProps {
    title: string;
    description?: string;
    isPrivate?: boolean;
    lastAccessedDate?: number;
    percentComplete?: number;
    isVerified?: boolean;
    ratingValue?: number;
    createdBy?: User;
    coverImage?: string;
}
const CollectionCard = ({ title, isVerified, percentComplete, createdBy, isPrivate, lastAccessedDate, ratingValue }: CollectionCardProps) => {
    const dateAccessed = lastAccessedDate ? convertToDateString(lastAccessedDate) : undefined;
    return (
        <Paper className="card" variant="outlined" sx={{ borderRadius: "1rem" }}>
            <div className="card-image">
                <img src={"https://weliveentertainment.com/wp-content/uploads/2020/03/theaters.jpg"} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="card-details">
                <span className="d-flex">
                    <h4 className="card-title m0">{title}</h4>
                    {isPrivate ? <Lock sx={{ fontSize: "14px" }} /> : null}
                    {isVerified ? <Verified color="primary" sx={{ fontSize: "14px" }} /> : null}
                </span>
                <div className="card-body">
                    <p className="card-text m0">This is a wider card with </p>
                    {dateAccessed ? (
                        <div className="text-muted">
                            <small>
                                <em>Last Accessed {dateAccessed}</em>
                            </small>
                        </div>
                    ) : null}
                </div>
                <div className={"card-summary"}>
                    {createdBy ? (
                        <div className={"d-flex"}>
                            <Avatar alt={createdBy.displayName} src={createdBy.photoURL} sx={{ width: 40, height: 40 }} />
                            <span>
                                <h5 className="text-muted m0"> {createdBy.displayName}</h5>
                                {ratingValue ? <Rating size={"small"} readOnly value={5} /> : null}
                            </span>
                        </div>
                    ) : null}
                </div>
            </div>
        </Paper>
    );
};

export default CollectionCard;
