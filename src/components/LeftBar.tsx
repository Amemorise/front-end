import { CollectionsBookmarkOutlined, HomeOutlined } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText, Slide } from "@mui/material";
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
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/collections">
                        <ListItem>
                            <ListItemIcon>
                                <CollectionsBookmarkOutlined fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Collections</ListItemText>
                        </ListItem>
                    </Link>
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
