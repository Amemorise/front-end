import { Add } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";

const AddCollectionButton = () => {
    return (
        <div className={"add-button"}>
            <Tooltip title="Add Collection">
                <Fab color="secondary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>
        </div>
    );
};

export default AddCollectionButton;
