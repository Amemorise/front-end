import { AppBar, Box, IconButton, Toolbar, InputBase, Menu, MenuItem, Avatar, Button } from "@mui/material";
import React from "react";
import { styled, alpha } from "@mui/material/styles";
import { Search as SearchIcon, Menu as MenuIcon } from "@mui/icons-material";
import Logo from "../images/logo/white.png";
import { User } from "../helpers/baseTypes";
import { signOut } from "../helpers/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "25rem",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

interface NavbarProps {
    user: User;
    leftBarOpen: boolean;
    toggleLeftBarOpen: React.Dispatch<boolean>;
}
const Navbar = ({ user, leftBarOpen, toggleLeftBarOpen }: NavbarProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/* <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
            <Divider /> */}
            <MenuItem
                onClick={() => {
                    signOut(navigate);
                    dispatch(logout());
                }}
            >
                Log Out
            </MenuItem>
        </Menu>
    );

    // const [dropDownAnchor, setDropDownAnchor] = React.useState<null | HTMLElement>(null);

    // const isDropDownOpen = Boolean(dropDownAnchor);

    // const dropdownId = "dropdown-menu";

    // const handleDropDownToggled=(event: React.MouseEvent<HTMLElement>) => {
    //     setDropDownAnchor(event.currentTarget);
    // };
    // const handleDropdownClose = ()=>{
    //     setDropDownAnchor(null);

    // }
    // const renderCollectionsMenu = (
    //     <Menu
    //         anchorEl={dropDownAnchor}
    //         anchorOrigin={{
    //             vertical: "top",
    //             horizontal: "right",
    //         }}
    //         id={dropdownId}
    //         keepMounted
    //         transformOrigin={{
    //             vertical: "top",
    //             horizontal: "right",
    //         }}
    //         open={isDropDownOpen}
    //         onClose={handleDropdownClose}
    //     >
    //         <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
    //         <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
    //         <Divider />
    //         <MenuItem onClick={() => signOut(navigate)}>Log Out</MenuItem>
    //     </Menu>
    // );

    return (
        <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 1000 }}>
            <AppBar position="static" sx={{ backgroundColor: "#1b3b6f", alignItems: "center" }}>
                <Toolbar sx={{ maxWidth: "2000px", width: "100%", boxSizing: "border-box", minHeight: "unset!important", height: "48px!important" }}>
                    <IconButton onClick={() => toggleLeftBarOpen(!leftBarOpen)} size="small" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2, display: { sm: "block", md: "none" } }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ height: "100%", flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Link style={{ height: "100%" }} to="/">
                            <img style={{ boxSizing: "border-box", maxHeight: "100%", width: "auto", padding: "0.75rem" }} src={Logo} alt="Amemorise Logo" />
                        </Link>
                        <Button>
                            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                                Home
                            </Link>
                        </Button>
                        <Button>
                            {/* aria-controls={dropdownId} aria-haspopup="true" onClick={handleDropDownToggled}> */}
                            <Link to="/collections" style={{ color: "white", textDecoration: "none" }}>
                                My Collections
                            </Link>
                        </Button>
                        {/* aria-controls={dropdownId} aria-haspopup="true" onClick={handleDropDownToggled}> */}
                        <Link to="/collections/create" style={{ color: "white", textDecoration: "none" }}>
                            Create Collection
                        </Link>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" size="small" inputProps={{ "aria-label": "search" }} />
                    </Search>
                    <Box sx={{ display: "flex" }}>
                        <IconButton size="small" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                            <Avatar alt={user.displayName} src={user.photoURL} sx={{ height: "35px", width: "35px" }} />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
            {/* {renderCollectionsMenu} */}
        </Box>
    );
};

export default Navbar;
