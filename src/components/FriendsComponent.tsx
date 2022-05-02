import { AvatarGroup, Avatar, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ProfileInterface } from "../helpers/baseTypes";

const FriendsComponent = () => {
    const users: ProfileInterface[] = [
        {
            profileURL: "/",
            photoURL: "test",
            displayName: "John Snow",
        },
        {
            profileURL: "/",
            photoURL: "test",
            displayName: "Kelvin Doe",
        },
        {
            profileURL: "/",
            photoURL: "test",
            displayName: "Ann Icon",
        },
    ];
    return (
        <div className="friends">
            <Typography variant="body1" fontWeight={100}>
                Users
            </Typography>
            <Link to={"/users"}>
                <AvatarGroup total={24} max={4} sx={{ justifyContent: "flex-end" }}>
                    {users.map((user, index) => {
                        const { displayName, photoURL } = user;
                        return (
                            <Tooltip title={displayName}>
                                <Avatar alt={displayName} src={photoURL} key={displayName + index} />
                            </Tooltip>
                        );
                    })}
                </AvatarGroup>
            </Link>
        </div>
    );
};

export default FriendsComponent;
