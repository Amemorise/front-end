import { Lock, Verified } from "@mui/icons-material";
import Image from "../images/world-flag.jpg";
import ProgressBar from "./ProgressBar";
import { Rating } from "react-simple-star-rating";
import { User } from "../helpers/baseTypes";
import { Avatar } from "@mui/material";
import "./styles/card.scss";

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
    const dateAccessed = lastAccessedDate ? new Date(lastAccessedDate * 1000).toDateString() : undefined;
    return (
        <div>
            <div className="card">
                <div className="card-container row">
                    <div className="card-text">
                        <div className="card-body">
                            <span className="d-flex">
                                <h5 className="card-title m0">{title}</h5>
                                {isPrivate ? <Lock sx={{ fontSize: "14px" }} /> : null}
                                {isVerified ? <Verified color="primary" sx={{ fontSize: "14px" }} /> : null}
                            </span>
                            <p className="card-text m0">This is a wider card with </p>
                            {dateAccessed ? (
                                <div className="text-muted">
                                    <small>
                                        <em>Last Accessed {dateAccessed}</em>
                                    </small>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="card-image">
                        <img src={Image} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className={"card-summary"}>
                        {createdBy ? (
                            <div className={"d-flex"}>
                                <Avatar alt={createdBy.displayName} src={createdBy.photoURL} sx={{ width: 20, height: 20 }}>
                                    {createdBy.displayName}
                                </Avatar>
                                <p className="text-muted m0"> {createdBy.displayName}</p>
                            </div>
                        ) : null}
                        {ratingValue ? <Rating size={16} readonly initialValue={ratingValue} ratingValue={0} /> : null}
                    </div>
                </div>
                <div className="row g-0">{percentComplete ? <ProgressBar percentComplete={percentComplete} /> : null}</div>
            </div>
        </div>
    );
};

export default CollectionCard;
