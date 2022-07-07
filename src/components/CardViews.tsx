import { Send } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, PublishedCollection } from "../helpers/baseTypes";
import { DUMMY_COLLECTION } from "../helpers/constants";
import { ReviewState } from "../pages/ReviewCollection";

const CardViews = ({ cards, collectionMetaData, collectionId }: PublishedCollection) => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const cardList = cards.length ? cards : DUMMY_COLLECTION.cards;
    const [userAnswer, setUserAnswer] = useState("");
    const { photoURL, hint, label } = cardList[currentQuestion];
    const [isCorrect, setIsCorrect] = useState(false);
    const [flipCard, setFlipCard] = useState(false);

    const [results, setResults] = useState<{ card: Card; isCorrect: boolean; userResponse: string }[]>([]);

    const onSubmitAnswer = (event: any) => {
        event.preventDefault();
        const answerCorrect = label.toLocaleLowerCase() === userAnswer.toLocaleLowerCase();
        setIsCorrect(answerCorrect);
        setFlipCard(true);
        const tempResults = [...results];
        tempResults.push({
            card: cardList[currentQuestion],
            isCorrect: answerCorrect,
            userResponse: userAnswer,
        });
        setResults(tempResults);
    };

    const onNextClick = () => {
        if (currentQuestion >= cardList.length - 1) {
            navigate(`/collections/${collectionId}/review`, {
                state: {
                    collectionMetaData,
                    review: results,
                } as ReviewState,
            });
        } else {
            setFlipCard(false);
            setIsCorrect(false);
            setUserAnswer("");
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    return (
        <div className="flashcard-container-outer display-padding">
            <h2>{collectionMetaData.prompt}</h2>
            <div className="flashcard-container-inner">
                <div className="flashcard-image-container">
                    <img className={`flashcard-image ${flipCard ? "active" : ""}`} src={photoURL} alt={hint} />
                    <span className={`flashcard-label d-flex ${flipCard ? "active" : ""} ${isCorrect ? "correct" : "incorrect"}`}>
                        <p className="m0">{flipCard ? label : null}</p>
                    </span>
                </div>

                <div className="flashcard-input-container">
                    {flipCard ? (
                        <>
                            <Button onClick={onNextClick} variant="contained" sx={{ width: "100%", padding: "1rem" }}>
                                Next
                            </Button>
                        </>
                    ) : (
                        <form id="User-input" onSubmit={onSubmitAnswer}>
                            <input
                                className="flashcard-input"
                                value={userAnswer}
                                onChange={({ target }) => {
                                    setUserAnswer(target.value);
                                }}
                                autoFocus
                                type={"text"}
                            />
                            <IconButton type="submit" className="flashcard-icon-button" color="success" sx={{ borderRadius: "unset", padding: " 0.5rem 1rem" }}>
                                <Send />
                            </IconButton>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardViews;
