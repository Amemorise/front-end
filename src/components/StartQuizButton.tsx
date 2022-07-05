import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PublishedCollection } from "../helpers/baseTypes";

const StartQuizButton = ({ titleText, collection }: { titleText: string; collection: PublishedCollection }) => {
    const navigate = useNavigate();
    const onStartClick = () => {
        navigate(`/collections/${collection.collectionId}/start`, { state: { collection } });
    };
    return (
        <div style={{ margin: "1rem auto " }}>
            <Button onClick={onStartClick} variant="contained" sx={{ borderRadius: "25px", padding: "0.5rem 2rem", textTransform: "unset" }} color="success">
                {titleText}
            </Button>
        </div>
    );
};

export default StartQuizButton;
