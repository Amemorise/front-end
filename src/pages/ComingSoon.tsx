import { Typography } from "@mui/material";
import React from "react";
import "../App.scss";
import WebTitle from "../components/WebTitle";

const ComingSoon = () => {
    return (
        <div className="d-flex" style={{ height: "100vh", width: "100vw", background: "#1b3b6f", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
                <WebTitle color={"white"} />
                <Typography variant={"h6"} color={"white"}>
                    COMING SOON
                </Typography>
            </div>
        </div>
    );
};

export default ComingSoon;
