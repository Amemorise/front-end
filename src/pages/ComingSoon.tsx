import { Typography } from "@mui/material";
import React from "react";
import "../App.scss";
import WebTitle from "../components/WebTitle";

const ComingSoon = () => {
    return (
        <div className="d-flex">
            <div style={{ textAlign: "center" }}>
                <WebTitle color={"white"} />
                <Typography variant={"h6"}>COMING SOON</Typography>
            </div>
        </div>
    );
};

export default ComingSoon;
