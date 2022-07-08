import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            LandingPage
            <Button onClick={() => navigate("/login")}>Go to home page</Button>
        </div>
    );
};

export default LandingPage;
