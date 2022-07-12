import { Search } from "@mui/icons-material";
import { Container, InputAdornment, Paper, TextField, Button, Grid } from "@mui/material";
import Paginate from "../components/Paginate";
import { useLocation } from "react-router-dom";
import "./styles/search-collection.scss";
import { useState } from "react";
import FreeTextDropDown from "../components/FreeTextDropDown";
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchCollection = () => {
    const card = [];
    const [searchText, setSearchText] = useState("");
    const query = useQuery();
    const searchQuery = query.get("searchQuery");
    const values = [
        "Oliver Hansen",
        "Van Henry",
        "April Tucker",
        "Ralph Hubbard",
        "Omar Alexander",
        "Carlos Abbott",
        "Miriam Wagner",
        "Bradley Wilkerson",
        "Virginia Andrews",
        "Kelly Snyder",
    ];

    return (
        <Container maxWidth={"xl"} sx={{ margin: "2rem 0" }}>
            <Grid container spacing={2}>
                {/* justify="space-between" alignItems="stretch" spacing={3}>*/}
                <Grid item sm={3} xs={12}>
                    {/* className="search-filters">*/}
                    <Paper elevation={2}>
                        Filter
                        <FreeTextDropDown
                            freeSolo={false}
                            selectedValues={[]}
                            setSelectedValues={() => console.log("here")}
                        />
                    </Paper>
                </Grid>
                <Grid item sm={9} xs={12}>
                    {/* className="search-body-container"> */}
                    <TextField
                        size="small"
                        value={searchText}
                        onKeyDown={(e) => {
                            if (e.code === "13") {
                                alert("enter");
                            }
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{ marginBottom: 2, width: "100%" }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button sx={{ marginRight: "-14px" }} color="primary">
                                        Search
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Paper elevation={6}>
                        <Paginate />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SearchCollection;
