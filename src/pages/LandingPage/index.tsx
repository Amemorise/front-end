import { Button, Box, Grid, Toolbar, Paper, Stack, Typography } from "@mui/material";
import Logo from "../../images/logo/main.png";
import { Link, useNavigate } from "react-router-dom";
import ImageRenderer from "../../components/ImageRenderer";
import { useMemo } from "react";
import HeroCard from "./components/HeroCard";
import Hand from "./images/Handholding-phone.png";
import "./components/styles.scss";

const LandingPage = () => {
    const navigate = useNavigate();
    const style = useMemo(() => ({ width: "2rem" }), []);
    return (
        <Box
            maxWidth={"xl"}
            className={"landing"}
            sx={{
                backgroundColor: "#1b3b6f",
                background: "linear-gradient(195deg, #4b6cb7 0%, #1b3b6f 100%)",
            }}
        >
            <Toolbar
                sx={{ maxHeight: "40px", display: "flex", justifyContent: "space-between", position: "sticky", top: 0 }}
            >
                <Link to="/landing">
                    <ImageRenderer src={Logo} alt="Amemorise Logo" style={style} />
                </Link>
                <Button onClick={() => navigate("/login")} variant={"contained"}>
                    Get Started
                </Button>
            </Toolbar>
            <section className="landing-info-section">
                <Stack direction={{ xs: "column", sm: "row" }}>
                    <Stack
                        sx={{ flex: 1, width: { xs: "unset", sm: 0 }, padding: "8rem 4rem", justifyContent: "center" }}
                    >
                        <Typography variant="h4">Learn anything...</Typography>
                        <Typography variant="h6">Quickly!</Typography>
                        <span></span>
                    </Stack>
                    <Box sx={{ flex: 1, width: { xs: "unset", sm: 0 }, img: { width: "100%" } }}>
                        <ImageRenderer src={Hand} alt="hero" />
                    </Box>
                </Stack>
            </section>
            <Grid container alignItems={"center"} justifyContent={"center"} className="hero-container-1">
                <HeroCard />
            </Grid>
            <Grid container>
                <Paper>Create Flash cards</Paper>
            </Grid>
            <section></section>
            <section></section>
        </Box>
    );
};

export default LandingPage;
