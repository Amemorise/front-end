import { Container, Typography, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import WebTitle from "../../components/WebTitle";

const Error404 = () => {
    return (
        <Container
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#1b3b6f",
            }}
        >
            <Stack
                alignItems={"center"}
                spacing={4}
                sx={{ backgroundColor: "white", padding: "4rem", borderRadius: "2rem" }}
            >
                <WebTitle />
                <Typography variant="h1">404</Typography>
                <Typography variant="h5">Page Not Found</Typography>
                <Link to="/">Back to Homepage</Link>
            </Stack>
        </Container>
    );
};

export default Error404;
