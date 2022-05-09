import { FormGroup, IconButton, TextField } from "@mui/material";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { AddPhotoAlternate, Delete, DragHandle } from "@mui/icons-material";
import { Card } from "../helpers/baseTypes";
import "./styles/card.scss";

interface CreateCardProps {
    card: { label: string; hint: string; photoURL: string };
    updateCard: (newCard: Card, index: number) => void;
    deleteCard: (index: number) => void;
    error: { photoURL: boolean; label: boolean };
    index: number;
}
const CreateCard = (props: CreateCardProps) => {
    const { card, error, index, updateCard, deleteCard } = props;
    const { label, hint, photoURL } = card;
    const defaultImage = photoURL ? [{ dataURL: photoURL }] : [];
    const [image, setImage] = React.useState<ImageListType>(defaultImage);

    const onChange = (newImage: ImageListType) => {
        setImage(newImage);

        if (newImage.length) {
            updateCard(
                {
                    ...card,
                    photoURL: newImage[0].dataURL || "",
                },
                index
            );
        }
    };

    const onChangeCard = (target: HTMLInputElement) => {
        updateCard(
            {
                ...card,
                [target.id]: target.value,
            },
            index
        );
    };
    return (
        <div className="create-card-container">
            <FormGroup className="form-fields" sx={{ flex: 1 }}>
                <ImageUploading value={image} onChange={onChange} dataURLKey="dataURL">
                    {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
                        <div style={error.photoURL ? { borderColor: "red" } : undefined} className={`upload__image-wrapper ${!imageList.length ? " image-border" : ""}`}>
                            {imageList.length ? (
                                imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image["dataURL"]} alt="" width="100" />
                                        <div className="image-item__btn-wrapper">
                                            <IconButton
                                                size="small"
                                                sx={{ backgroundColor: "#f0f0f0" }}
                                                aria-label="delete"
                                                onClick={() => {
                                                    onImageRemove(index);
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
                                <IconButton color={error.photoURL ? "error" : undefined} onClick={onImageUpload} {...dragProps} sx={{ width: "100%", height: "100%", borderRadius: 0 }}>
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
                <TextField helperText={error.label || error.photoURL ? " " : ""} id="hint" label="Hint" defaultValue={hint} onChange={(event) => onChangeCard(event.target as HTMLInputElement)} />
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
                <span>
                    <IconButton size={"small"}>
                        <DragHandle sx={{ width: "16px" }} />
                    </IconButton>
                </span>
            </div>
        </div>
    );
};

export default CreateCard;
