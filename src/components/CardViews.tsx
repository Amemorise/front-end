import { Send } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PublishedCard, Card, PublishedCollectionMetaData } from "../helpers/baseTypes";
import { ReviewState } from "../pages/ReviewCollection";

const CardViews = ({ cards, prompt, collectionMetaData }: { collectionMetaData: PublishedCollectionMetaData; cards: PublishedCard[]; prompt: string }) => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const { photoURL, hint, label } = cards[currentQuestion];
    const [isCorrect, setIsCorrect] = useState(false);
    const [flipCard, setFlipCard] = useState(false);

    const [results, setResults] = useState<{ card: Card; isCorrect: boolean }[]>([]);

    const onSubmitAnswer = () => {
        const answerCorrect = label.toLocaleLowerCase() === userAnswer.toLocaleLowerCase();
        setIsCorrect(answerCorrect);
        setFlipCard(true);
        const tempResults = [...results];
        tempResults.push({
            card: cards[currentQuestion],
            isCorrect: answerCorrect,
        });
        setResults(tempResults);
    };

    const onNextClick = () => {
        if (currentQuestion >= cards.length - 1) {
            navigate("review", {
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
        <div className="flashcard-container-outer">
            <h2>{prompt}</h2>
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
                            <Button variant="contained" sx={{ width: "100%", padding: "1rem" }} onClick={onNextClick}>
                                Next
                            </Button>
                        </>
                    ) : (
                        <form onSubmit={onSubmitAnswer}>
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
