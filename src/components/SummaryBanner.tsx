import { CircularProgress } from "@mui/material";
import React from "react";

const SummaryBanner = () => {
    return (
        <div className="summary-banner">
            <h4>Summary</h4>
            <CircularProgress value={75} />
        </div>
    );
};

export default SummaryBanner;
