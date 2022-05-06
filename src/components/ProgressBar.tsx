import { Tooltip } from "@mui/material";
import React from "react";

interface ProgressBarProps {
    percentComplete: number;
}

const ProgressBar = ({ percentComplete }: ProgressBarProps) => {
    const className = percentComplete > 75 ? "bg-success" : percentComplete > 30 ? "bg-warning" : "bg-danger";
    return (
        <div>
            <Tooltip title={`${percentComplete}% complete`}>
                <div className="progress" style={{ height: "0.3rem" }}>
                    <div className={`progress-bar  ${className}`} role="progressbar" style={{ width: `${percentComplete}%` }} aria-valuenow={percentComplete} aria-valuemin={0} aria-valuemax={100}></div>
                </div>
            </Tooltip>
        </div>
    );
};

export default ProgressBar;
