import { CircularProgress } from "@mui/material";
import React from "react";

const SummaryBanner = () => {
    return (
        <div className="summary-banner">
            <h5>Summary</h5>
            <CircularProgress value={75} />
        </div>
    );
};

export default SummaryBanner;
