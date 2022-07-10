import { Verified, Lock } from "@mui/icons-material";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Rating,
} from "@mui/material";
import { PublishedCollectionMetaData } from "../helpers/baseTypes";
import { convertToDateString } from "../helpers/helpers";
import { Edit, Delete } from "@mui/icons-material";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import "./styles/collection-header.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setError } from "../redux/error";
import { setIsLoading } from "../redux/loading";
import { api } from "../helpers/apiHelpers";

interface CollectionHeaderProps {
    collectionMetaData: PublishedCollectionMetaData;
    collectionId: number;
}

const CollectionHeader = (props: CollectionHeaderProps) => {
    const { collectionId, collectionMetaData } = props;
    const user = useSelector((state: RootState) => state.user.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { title, verified, createdBy, creationDate, rating } = collectionMetaData;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteCollection = async () => {
        dispatch(setIsLoading(true));
        try {
            const response = await api.delete(`/collections/${collectionId}`);
            if (response.status === 200) {
                navigate("/collections");
            }
        } catch (err: any) {
            dispatch(setError({ name: "Collection deletion failed", message: "Please Refresh" }));
        }
        dispatch(setIsLoading(false));
        handleClose();
    };

    return (
        <div className="header">
            <h2>
                {title}
                {collectionMetaData.private ? <Lock fontSize={"small"} /> : null}
                {verified ? <Verified color={"primary"} fontSize={"small"} /> : null}
            </h2>

            <span className="created-by-span d-flex text-muted">
                <Avatar
                    alt={createdBy.displayName}
                    sx={{ width: "24px", height: "24px" }}
                    sizes={"small"}
                    src={createdBy.photoURL}
                />
                <small> by {createdBy.displayName}</small>
                <small> {convertToDateString(creationDate)}</small>
            </span>

            {collectionMetaData.private || !rating ? null : (
                <span className="ratings-span d-flex text-muted">
                    <Rating value={rating.value} size={"small"} />
                    <small>{rating.raterCount} ratings</small>
                </span>
            )}
            {user && collectionMetaData.createdBy.userId === user.userId ? (
                <span>
                    <IconButton size="small" onClick={() => navigate(`/collections/${collectionId}/edit`)}>
                        <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleClickOpen()}>
                        <Delete fontSize="small" />
                    </IconButton>
                </span>
            ) : null}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this collection"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Collection deletion is permanent and cannot be undone. Do you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Cancel
                    </Button>
                    <Button onClick={deleteCollection}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CollectionHeader;
