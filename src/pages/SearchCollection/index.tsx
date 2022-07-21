import { Search } from "@mui/icons-material";
import { Container, InputAdornment, TextField, Button, Grid, Skeleton, Box, DialogTitle, Dialog } from "@mui/material";
import Paginate from "./components/Paginate";
import { Link, useSearchParams } from "react-router-dom";
import "./styles/search-collection.scss";
import { useState, useEffect } from "react";
import { useFetch } from "../../helpers/apiHelpers";
import CollectionCard from "../../components/CollectionCard";
import { PublishedCollection } from "../../helpers/baseTypes";
import { usePageTitle } from "../../helpers/helpers";
import SearchFilters from "./components/SearchFilters";

const SearchCollection = () => {
    usePageTitle("Search");

    let [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("searchQuery") || "";
    const [searchText, setSearchText] = useState(searchQuery);

    const { data, loading } = useFetch(`/search${window.location.search}`);
    const [collections, setCollections] = useState<PublishedCollection[]>([]);
    const [totalCollections, setTotalCollections] = useState(0);

    useEffect(() => {
        if (!loading && data) {
            setTotalCollections(data.totalCollections);
            setCollections(data.collections);
        }
    }, [data, loading]);

    const searchCollections = async () => {
        try {
            const queries = Object.fromEntries([...searchParams]);
            setSearchParams({ ...queries, searchQuery: searchText });
        } catch (err: any) {
            throw new Error(err);
        }
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Container maxWidth={"xl"} sx={{ margin: "2rem auto" }}>
            <Grid container spacing={2}>
                <Grid item md={3} sm={6} xs={12}>
                    <Box sx={{ display: ["none", "block"] }}>
                        <SearchFilters
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            handleClose={handleClose}
                            mobileView={open}
                        />
                    </Box>
                    <Button onClick={handleOpen} fullWidth variant="contained" sx={{ display: ["block", "none"] }}>
                        Filter and Sort
                    </Button>
                </Grid>
                <Grid item md={9} sm={6} xs={12}>
                    {/* className="search-body-container"> */}
                    <TextField
                        size="small"
                        value={searchText}
                        onKeyDown={(e) => {
                            if (e.code === "Enter") {
                                searchCollections();
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
                                    <Button
                                        disabled={!searchText.trim()}
                                        sx={{ marginRight: "-14px" }}
                                        color="primary"
                                        onClick={searchCollections}
                                    >
                                        Search
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Grid container spacing={3} sx={{ width: "100%", marginBottom: "1rem", marginLeft: "unset" }}>
                        {loading ? (
                            Array.from(Array(8)).map((_arr, index) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <Skeleton
                                            animation="wave"
                                            key={index}
                                            variant="rectangular"
                                            height={300}
                                            sx={{ flex: 1, borderRadius: "1rem" }}
                                        />
                                    </Grid>
                                );
                            })
                        ) : collections && collections.length ? (
                            collections.map((collection, index) => {
                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={collection.collectionId + " " + index}>
                                        <Link to={`/collections/${collection.collectionId}`} className="card-link">
                                            <CollectionCard {...collection} showTags={true} />
                                        </Link>
                                    </Grid>
                                );
                            })
                        ) : (
                            <h5>No matching results. Please refine filters.</h5>
                        )}
                    </Grid>
                    {collections && collections.length ? (
                        <Paginate
                            searchParams={searchParams}
                            setSearchParams={setSearchParams}
                            totalCollections={totalCollections}
                        />
                    ) : null}
                </Grid>
            </Grid>

            <Dialog onClose={handleClose} open={open} maxWidth="sm">
                <DialogTitle>Filters</DialogTitle>
                <SearchFilters
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    handleClose={handleClose}
                    mobileView={open}
                />
            </Dialog>
        </Container>
    );
};

export default SearchCollection;
