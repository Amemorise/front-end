import { Add, Save } from "@mui/icons-material";
import { FormGroup, FormControlLabel, Switch, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import CreateCard from "../components/CreateCard";
import Dropdown from "../components/Dropdown";
import FABButton from "../components/FABButton";
import { Card, CollectionMetaData } from "../helpers/baseTypes";
import { setPageTitle } from "../helpers/helpers";
import { validateCollection } from "../helpers/validateCollection";

const CreateCollection = () => {
    useEffect(() => setPageTitle("Create Collection"), []);

    const newCard: Card = {
        label: "",
        hint: "",
        photoURL: "",
    };
    const [cards, setCards] = useState([newCard]);

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
            // for (let i = index; i < newCards.length; i++) {
            //     newCards[i].index = i;
            // }
            setCards([...newCards]);
        }
    };

    const [collectionMetaData, setCollectionMetaData] = useState<CollectionMetaData>({ title: "", description: "", tags: [], private: false });
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

    const [errors, setErrors] = useState<any>({ collectionMetaData: {}, cards: [] });
    const createCollection = () => {
        const errors = validateCollection({ collectionMetaData, cards });
        setErrors(errors);
    };
    return (
        <div className="create-collection display-padding">
            <div className="collection-metadata">
                <h5>Create Collection</h5>
                <div className="collection-info">
                    <FormGroup>
                        <TextField onChange={(event) => onChange(event.target as HTMLInputElement)} required value={collectionMetaData.title} size={"small"} id="title" label="Collection Title" />

                        <span className="d-flex" style={{ margin: "1rem 0" }}>
                            <TextField
                                onChange={(event) => onChange(event.target as HTMLInputElement)}
                                value={collectionMetaData.description}
                                multiline
                                maxRows={4}
                                sx={{ flex: 1, marginRight: 1 }}
                                size={"small"}
                                id="description"
                                label="Description"
                            />
                            <Dropdown values={values} selectedValues={collectionMetaData.tags} setSelectedValues={setTags} />
                        </span>
                        <FormControlLabel control={<Switch checked={collectionMetaData.private} id={"private"} onChange={(event) => onChange(event.target as HTMLInputElement)} />} label="Private" />
                    </FormGroup>
                </div>
            </div>
            <div className="collection-cards">
                {cards.map((card, index) => {
                    return <CreateCard index={index} key={index} updateCard={updateCard} deleteCard={deleteCard} card={card} error={errors && errors.cards.length ? errors.cards[index] : ""} />;
                })}
                <FABButton title="Add Card" icon={<Add />} onClick={() => setCards([...cards, { ...newCard, index: cards.length }])} />
            </div>
            <div className="create-footer">
                <button onClick={() => console.log(cards)}>console log</button>
                <Button disabled={!cards.length} variant="contained" endIcon={<Save />} onClick={createCollection}>
                    Create Collection
                </Button>
            </div>
        </div>
    );
};

export default CreateCollection;
