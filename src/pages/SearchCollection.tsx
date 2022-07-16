import { Search } from "@mui/icons-material";
import { Container, InputAdornment, Paper, TextField, Button, Grid, Skeleton } from "@mui/material";
import Paginate from "../components/Paginate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./styles/search-collection.scss";
import { useState, useEffect } from "react";
import FreeTextDropDown from "../components/FreeTextDropDown";
import { useFetch } from "../helpers/apiHelpers";
import CollectionCard from "../components/CollectionCard";
import { PublishedCollection } from "../helpers/baseTypes";
import { usePageTitle } from "../helpers/helpers";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SearchCollection = () => {
    usePageTitle("Search");
    // const card = [];
    const query = useQuery();

    const searchQuery = query.get("searchQuery") || "";
    const searchTags = query.get("tags") || "";
    const searchPage = query.get("page") || "1";
    const searchLimit = query.get("limit") || "15";

    const { data, loading } = useFetch(
        `/search?searchQuery=${searchQuery}&tags=${searchTags}&limit=${searchLimit}&page=${searchPage}`
    );
    const [collections, setCollections] = useState<PublishedCollection[]>([]);
    const [totalCollections, setTotalCollections] = useState(0);
    useEffect(() => {
        if (!loading && data) {
            setTotalCollections(data.totalCollections);
            setCollections(data.collections);
        }
    }, [data, loading]);
    const [searchText, setSearchText] = useState(searchQuery);
    const [tags, setTags] = useState(searchTags?.trim() ? searchTags.split(",") : []);
    const [pageNumber, setPageNumber] = useState(Number(searchPage));
    const [limit] = useState(Number(searchLimit));

    const history = useNavigate();
    const searchCollections = async () => {
        try {
            const queryString = `/search?searchQuery=${searchText}&tags=${tags.join(",")}`;
            history(queryString);
        } catch (err: any) {
            throw new Error(err);
        }
    };

    return (
        <Container maxWidth={"xl"} sx={{ margin: "2rem auto" }}>
            <Grid container spacing={2}>
                {/* justify="space-between" alignItems="stretch" spacing={3}>*/}
                <Grid item sm={3} xs={12}>
                    {/* className="search-filters">*/}
                    <Paper elevation={2}>
                        Filter
                        <FreeTextDropDown freeSolo={false} selectedValues={[...tags]} setSelectedValues={setTags} />
                    </Paper>
                </Grid>
                <Grid item sm={9} xs={12}>
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
                    <Grid container spacing={3} sx={{ marginBottom: "1rem" }}>
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
                                    <Grid item xs={12} sm={8} md={4} lg={3} key={collection.collectionId + " " + index}>
                                        <Link to={`/collections/${collection.collectionId}`} className="card-link">
                                            <CollectionCard {...collection} />
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
                            page={pageNumber}
                            setPage={setPageNumber}
                            count={Math.ceil(totalCollections / limit)}
                        />
                    ) : null}
                </Grid>
            </Grid>
        </Container>
    );
};

export default SearchCollection;
