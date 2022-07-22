import { Add, CollectionsBookmarkOutlined, HomeOutlined } from "@mui/icons-material";
import { Button, List, ListItem, ListItemIcon, Slide } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles/bars.scss";

interface LeftBarProps {
    leftBarOpen: boolean;
}
const LeftBar = ({ leftBarOpen }: LeftBarProps) => {
    return leftBarOpen ? (
        <Slide direction="right" in={leftBarOpen} mountOnEnter unmountOnExit>
            <div className="leftBar">
                <List sx={{ height: "100%" }}>
                    <Link to="/">
                        <ListItem>
                            <ListItemIcon>
                                <HomeOutlined fontSize="small" />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Link to="/collections">
                        <ListItem>
                            <ListItemIcon>
                                <CollectionsBookmarkOutlined fontSize="small" />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                    <Button>
                        <Link
                            to="/collections/create"
                            style={{
                                background: "white",
                                borderRadius: "1rem",
                                color: "#1b3b6f",
                                display: "flex",
                                padding: "0.25rem 1rem",
                                textDecoration: "none",
                            }}
                        >
                            <Add fontSize="small" />
                        </Link>
                    </Button>
                    {/* <Link to="/leaderboard">
                        <ListItem>
                            <ListItemIcon>
                                <LeaderboardOutlined fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Leader Board</ListItemText>
                        </ListItem>
                    </Link> */}
                </List>
            </div>
        </Slide>
    ) : null;
};

export default LeftBar;
