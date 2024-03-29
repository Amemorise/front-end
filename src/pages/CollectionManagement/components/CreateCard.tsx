import { FormGroup, IconButton, TextField } from "@mui/material";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { AddPhotoAlternate, Delete } from "@mui/icons-material";
import { EditingCard } from "../../../helpers/baseTypes";
import _ from "lodash";
import ImageRenderer from "../../../components/ImageRenderer";

interface CreateCardProps {
    card: EditingCard;
    updateCard: (newCard: EditingCard, index: number) => void;
    deleteCard: (index: number) => void;
    error: { photoURL: boolean; label: boolean };
    index: number;
}
const CreateCard = (props: CreateCardProps) => {
    const { card, error, index, updateCard, deleteCard } = props;
    const { label, hint, photoURL } = card;
    const defaultImage = photoURL ? [{ dataURL: typeof photoURL === "string" ? photoURL : photoURL.dataURL }] : [];
    const [image, setImage] = React.useState<ImageListType>(defaultImage);

    const onChange = (newImage: ImageListType) => {
        setImage(newImage);

        if (newImage.length) {
            updateCard(
                {
                    ...card,
                    photoURL: newImage[0] || "",
                },
                index
            );
        }
    };
    const delayedUpdate = _.debounce((target) => {
        update(target);
    }, 1500);

    const update = (target: HTMLInputElement) => {
        updateCard(
            {
                ...card,
                [target.id]: target.value,
            },
            index
        );
    };
    const onChangeCard = (target: HTMLInputElement) => {
        if (target.id === "label" || target.id === "hint") {
            delayedUpdate(target);
        } else {
            update(target);
        }
    };
    return (
        <div className="create-card-container">
            <FormGroup className="form-fields" sx={{ flex: 1 }}>
                <ImageUploading multiple={false} value={image} onChange={onChange} dataURLKey="dataURL">
                    {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
                        <div
                            style={error.photoURL ? { borderColor: "red" } : undefined}
                            className={`upload__image-wrapper ${!imageList.length ? " image-border" : ""}`}
                        >
                            {imageList.length ? (
                                imageList.map((image, newIndex) => (
                                    <div key={newIndex} className="image-item">
                                        <ImageRenderer src={image["dataURL"]} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <IconButton
                                                size="small"
                                                sx={{ backgroundColor: "#f0f0f0" }}
                                                aria-label="delete"
                                                onClick={() => {
                                                    onImageRemove(newIndex);
                                                    updateCard(
                                                        {
                                                            ...card,
                                                            photoURL: "",
                                                        },
                                                        index
                                                    );
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <IconButton
                                    color={error.photoURL ? "error" : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                    sx={{ width: "100%", height: "100%", borderRadius: 0 }}
                                >
                                    <AddPhotoAlternate />
                                </IconButton>
                            )}
                        </div>
                    )}
                </ImageUploading>
                <TextField
                    required
                    error={error.label}
                    helperText={error.label ? "Label is required" : error.photoURL ? "Image is required" : ""}
                    id="label"
                    label="Label"
                    defaultValue={label}
                    onChange={(event) => onChangeCard(event.target as HTMLInputElement)}
                />
                <TextField
                    helperText={error.label || error.photoURL ? " " : ""}
                    id="hint"
                    label="Hint"
                    defaultValue={hint}
                    onChange={(event) => onChangeCard(event.target as HTMLInputElement)}
                />
            </FormGroup>
            <div className="card-ordering">
                <span>
                    <h5 className="m0">{index + 1}</h5>
                </span>
                <span>
                    <IconButton size={"small"} onClick={() => deleteCard(index)}>
                        <Delete sx={{ width: "16px" }} />
                    </IconButton>
                </span>
            </div>
        </div>
    );
};

export default CreateCard;
