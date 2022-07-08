import { Typography } from "@mui/material";

const WebTitle = ({ color }: { color?: string }) => {
    return (
        <Typography sx={{ fontFamily: "Pacifico", padding: "0.5rem", color: color || "#1b3b6f" }} variant={"h2"}>
            amemorise
        </Typography>
    );
};

export default WebTitle;
