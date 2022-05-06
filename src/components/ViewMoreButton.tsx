import { ChevronRight } from "@mui/icons-material";
import { Fab, Tooltip } from "@mui/material";

const ViewMoreButton = () => {
    return (
        <div>
            <Tooltip title="View More">
                <Fab color="primary" aria-label="add">
                    <ChevronRight />
                </Fab>
            </Tooltip>
        </div>
    );
};

export default ViewMoreButton;
