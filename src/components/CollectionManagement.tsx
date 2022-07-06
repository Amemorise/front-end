import { Add, Save } from "@mui/icons-material";
import { FormGroup, TextField, FormControlLabel, Switch, Tooltip, Button } from "@mui/material";
import { cloneDeep } from "lodash";
import { useState } from "react";
import Select from "../components/Select";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Collection, Card, CollectionMetaData } from "../helpers/baseTypes";
import { Categories } from "../helpers/Categories";
import { validateCollection, errorSchema } from "../helpers/validateCollection";
import CreateCard from "./CreateCard";
import FABButton from "./FABButton";
import { newCard } from "../helpers/constants";
import { setError } from "../redux/error";
import { setIsLoading } from "../redux/loading";
import axios from "axios";
import FreeTextDropDown from "./FreeTextDropDown";

interface CollectionManagementProps extends Collection {
    existingCollection: boolean;
    collectionId?: number;
}

const CollectionManagement = (props: CollectionManagementProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { existingCollection, collectionId } = props;
    const tempErrors = {
        collectionMetaData: errorSchema.collectionMetaData,
        cards: new Array(props.cards.length).fill(errorSchema.cards),
    };
    const [errors, setErrors] = useState(tempErrors);
    const [cards, setCards] = useState([...props.cards]);
    const [collectionMetaData, setCollectionMetaData] = useState<CollectionMetaData>(props.collectionMetaData);

    const updateCard = (newCard: Card, index: number) => {
        const newCards = [...cards];
        if (newCards.length > index) {
            newCards[index] = newCard;
            setCards([...newCards]);
        }
    };

    const deleteCard = (index: number) => {
        if (cards.length > index) {
            const newCards = [...cards];
            newCards.splice(index, 1);
            setCards([...newCards]);
        }
    };

    const onChange = (target: HTMLInputElement) => {
        if (!target.id && !target.name && target.value) {
            target.id = "category";
        }
        setCollectionMetaData({
            ...collectionMetaData,
            [target.id]: target.id === "private" ? !collectionMetaData.private : target.value,
        });
    };
    const setTags = (tags: string[]) => {
        setCollectionMetaData({
            ...collectionMetaData,
            tags,
        });
    };
    const values = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard", "Omar Alexander", "Carlos Abbott", "Miriam Wagner", "Bradley Wilkerson", "Virginia Andrews", "Kelly Snyder"];

    const saveCollection = async () => {
        let tempErrors = validateCollection({ collectionMetaData, cards });
        setErrors({ ...tempErrors.errors });

        dispatch(setIsLoading(true));
        if (!tempErrors.errorFound) {
            try {
                let response;
                if (existingCollection) {
                    response = await axios.put(`/collections/${collectionId}`, { collectionMetaData, cards });
                } else {
                    response = await axios.post(`/collections/`, { collectionMetaData, cards });
                }

                if (response && response.status === 200) {
                    const data = response.data;
                    if (data && data.collectionId) {
                        navigate(`/collections/${data.collectionId}`);
                    }
                }
            } catch (err: any) {
                dispatch(setError({ name: "Error Saving Collection", message: "Please Refresh" }));
            }
        }

        dispatch(setIsLoading(false));
    };

    return (
        <div className="create-collection display-padding">
            <div className="collection-metadata">
                <h4>{existingCollection ? "Edit" : "Create"} Collection</h4>
                <div className="collection-info">
                    <FormGroup>
                        <TextField
                            error={errors.collectionMetaData.title}
                            helperText={errors.collectionMetaData.title ? "A title is required" : ""}
                            onChange={(event) => onChange(event.target as HTMLInputElement)}
                            required
                            value={collectionMetaData.title}
                            size={"small"}
                            id="title"
                            label="Collection Title"
                        />

                        <span className="d-flex" style={{ margin: "1rem 0" }}>
                            <TextField
                                onChange={(event) => onChange(event.target as HTMLInputElement)}
                                value={collectionMetaData.description}
                                required
                                error={errors.collectionMetaData.description}
                                helperText={errors.collectionMetaData.description ? "A description is required" : ""}
                                multiline
                                maxRows={4}
                                sx={{ flex: 1, marginRight: 1 }}
                                size={"small"}
                                id="description"
                                label="Description"
                            />
                            <Select
                                required={true}
                                label={"Category"}
                                selected={collectionMetaData.category || ""}
                                values={Categories.map((cat) => cat.name).sort()}
                                onChange={(event) => onChange(event.target as HTMLInputElement)}
                                error={errors.collectionMetaData.category}
                                helperText={errors.collectionMetaData.description ? "A category is required" : ""}
                            />
                        </span>

                        <span className="d-flex" style={{ margin: "1rem 0" }}>
                            <TextField
                                error={errors.collectionMetaData.prompt}
                                helperText={errors.collectionMetaData.prompt ? "A prompt is required" : ""}
                                onChange={(event) => onChange(event.target as HTMLInputElement)}
                                required
                                sx={{ flex: 1, marginRight: 1 }}
                                value={collectionMetaData.prompt}
                                size={"small"}
                                id="prompt"
                                label="Collection Prompt"
                            />
                            <FreeTextDropDown values={values} selectedValues={collectionMetaData.tags || []} setSelectedValues={setTags} />
                        </span>

                        <FormControlLabel control={<Switch checked={collectionMetaData.private} id={"private"} onChange={(event) => onChange(event.target as HTMLInputElement)} />} label="Private" />
                    </FormGroup>
                </div>
            </div>
            <div className="collection-cards">
                {cards.map((card, index) => {
                    return <CreateCard index={index} key={index + card.photoURL + JSON.stringify(errors.cards)} updateCard={updateCard} deleteCard={deleteCard} card={card} error={errors.cards[index]} />;
                })}
                <FABButton
                    title="Add Card"
                    icon={<Add />}
                    onClick={() => {
                        setCards([...cards, { ...newCard, id: cards.length }]);
                        setErrors({
                            ...errors,
                            cards: [...errors.cards, cloneDeep(errorSchema.cards[0])],
                        });
                    }}
                />
            </div>
            <div className="create-footer">
                <Tooltip title={cards.length < 3 ? "Collection should have at least 3 cards" : ""}>
                    <Button disabled={cards.length < 3} variant="contained" endIcon={<Save />} onClick={saveCollection}>
                        Save Collection
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default CollectionManagement;
