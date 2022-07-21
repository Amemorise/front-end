import { AppBar, Box, IconButton, Toolbar, InputBase, Menu, MenuItem, Avatar, Button, Slide } from "@mui/material";
import React, { useState, MouseEvent } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Search as SearchIcon, Menu as MenuIcon, Add } from "@mui/icons-material";
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
        InputProps: { autoFocus: true },
        inputProps: { autoFocus: true },
        autoFocus: true,
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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchText, setSearchText] = useState("");

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = "navbar-menu";
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

    const containerRef = React.useRef(null);
    return (
        <Box sx={{ flexGrow: 1, position: "sticky", top: 0, zIndex: 1000 }}>
            <AppBar position="static" sx={{ backgroundColor: "#1b3b6f", alignItems: "center" }}>
                <Toolbar
                    sx={{
                        maxWidth: "2000px",
                        width: "100%",
                        boxSizing: "border-box",
                        minHeight: "unset!important",
                        height: "48px!important",
                    }}
                >
                    <IconButton
                        onClick={() => toggleLeftBarOpen(!leftBarOpen)}
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: { sm: "block", md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ height: "100%", flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Link style={{ height: "100%" }} to="/home">
                            <img
                                style={{
                                    boxSizing: "border-box",
                                    maxHeight: "100%",
                                    width: "auto",
                                    padding: "0.75rem",
                                }}
                                src={Logo}
                                alt="Amemorise Logo"
                            />
                        </Link>
                        <Button>
                            <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
                                Home
                            </Link>
                        </Button>
                        <Button>
                            <Link to="/collections" style={{ color: "white", textDecoration: "none" }}>
                                My Collections
                            </Link>
                        </Button>
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
                                Create <Add fontSize="small" />
                            </Link>
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Slide in={searchExpanded} direction="up" ref={containerRef} container={containerRef.current}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputRef={(input) => input && input.focus()}
                                size="small"
                                fullWidth
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    alert(`${JSON.stringify(e)}`);
                                    alert("here");
                                    if (e.code === "Enter") {
                                        navigate(`/search?searchQuery=${searchText}`);
                                    }
                                }}
                                autoFocus={true}
                                onBlur={() => setSearchExpanded(false)}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                    </Slide>

                    <Box sx={{ display: "flex" }}>
                        {searchExpanded ? null : (
                            <IconButton
                                size="small"
                                aria-label="search"
                                color="inherit"
                                onClick={() => setSearchExpanded(true)}
                            >
                                <SearchIcon />
                            </IconButton>
                        )}
                        <IconButton
                            size="small"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
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
