import { Add, Save } from "@mui/icons-material";
import { FormGroup, FormControlLabel, Switch, TextField, Button, Tooltip } from "@mui/material";
import { cloneDeep } from "lodash";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateCard from "../components/CreateCard";
import Dropdown from "../components/Dropdown";
import FABButton from "../components/FABButton";
import useFetch from "../helpers/apiHelpers";
import { Card, CollectionMetaData, PublishedCollection, User } from "../helpers/baseTypes";
import { DEFAULT_NEW_CARDS } from "../helpers/constants";
import { setPageTitle } from "../helpers/helpers";
import { errorSchema, validateCollection } from "../helpers/validateCollection";

const CreateCollection = ({ user }: { user: User | undefined }) => {
    useEffect(() => setPageTitle("Create Collection"), []);
    const navigate = useNavigate();

    const { data, loading, error } = useFetch("/collections/");
    console.log({ data, loading, error });

    const newCard: Card = {
        label: "",
        hint: "",
        photoURL: "",
        id: 0,
    };

    const defaultCards = [];

    for (let i = 0; i < DEFAULT_NEW_CARDS; i++) {
        defaultCards.push({
            ...newCard,
            id: i,
        });
    }
    const [cards, setCards] = useState([...defaultCards]);

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

    const [collectionMetaData, setCollectionMetaData] = useState<CollectionMetaData>({ title: "", description: "", tags: [], private: false, prompt: "What is this card?" });

    const onChange = (target: HTMLInputElement) => {
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

    const tempErrors = {
        collectionMetaData: errorSchema.collectionMetaData,
        cards: new Array(DEFAULT_NEW_CARDS).fill(errorSchema.cards),
    };
    const [errors, setErrors] = useState(tempErrors);

    const createCollection = () => {
        let tempErrors = validateCollection({ collectionMetaData, cards });
        setErrors({ ...tempErrors.errors });
        if (!tempErrors.errorFound && user) {
            const tempPublishedCollection: PublishedCollection = {
                collectionMetaData: {
                    ...collectionMetaData,
                    verified: false,
                    id: 46783,
                    creationDate: Date.now(),
                    rating: {
                        value: 0,
                        raterCount: 0,
                    },
                    createdBy: user,
                },
                cards,
            };
            const id = 6457;
            navigate(`/collections/${id}`, { state: { collection: tempPublishedCollection } });
        }
    };
    return (
        <div className="create-collection display-padding">
            <div className="collection-metadata">
                <h4>Create Collection</h4>
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
                            <Dropdown values={values} selectedValues={collectionMetaData.tags || []} setSelectedValues={setTags} />
                        </span>

                        <TextField
                            error={errors.collectionMetaData.prompt}
                            helperText={errors.collectionMetaData.prompt ? "A prompt is required" : ""}
                            onChange={(event) => onChange(event.target as HTMLInputElement)}
                            required
                            sx={{ margin: "0.5rem 0 1rem " }}
                            value={collectionMetaData.prompt}
                            size={"small"}
                            id="prompt"
                            label="Collection Prompt"
                        />

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
                    <Button disabled={cards.length < 3} variant="contained" endIcon={<Save />} onClick={createCollection}>
                        Create Collection
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default CreateCollection;
