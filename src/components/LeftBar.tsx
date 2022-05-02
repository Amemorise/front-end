import { CollectionsBookmarkOutlined, HomeOutlined, LeaderboardOutlined } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles/bars.scss";

interface LeftBarProps {
    leftBarOpen: boolean;
}
const LeftBar = ({ leftBarOpen }: LeftBarProps) => {
    return leftBarOpen ? (
        <div className="leftBar">
            <div>
                <List sx={{ height: "100%" }}>
                    <Link to="/home">
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
                    <Link to="/leaderboard">
                        <ListItem>
                            <ListItemIcon>
                                <LeaderboardOutlined fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Leader Board</ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </div>
        </div>
    ) : null;
};

export default LeftBar;
