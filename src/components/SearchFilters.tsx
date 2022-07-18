import { ArrowDropDown, ArrowDropUp, ExpandMore, FilterList } from "@mui/icons-material";
import {
    Paper,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
    Button,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
} from "@mui/material";
import { useState, MouseEvent, Dispatch } from "react";
import { Categories } from "../helpers/Categories";
import FreeTextDropDown from "./FreeTextDropDown";

interface SearchFiltersProps {
    searchParams: URLSearchParams;
    setSearchParams: Dispatch<any>;
    handleClose: Dispatch<any>;
    mobileView: boolean;
}
const SearchFilters = ({ searchParams, setSearchParams, handleClose, mobileView }: SearchFiltersProps) => {
    // const searchLimit = searchParams.get("limit") || "15";
    const searchDescending = searchParams.get("descending") || true;
    const searchSortBy = searchParams.get("sortBy") || "date";
    const searchTags = searchParams.get("tags") || "";

    const [sortCriteria, setSortCriteria] = useState(searchSortBy);
    const [sortDescending, setSortDescending] = useState(searchDescending);

    const [tags, setTags] = useState(searchTags?.trim() ? searchTags.split(",") : []);
    const handleChangeSort = (_event: MouseEvent<HTMLElement>, nextSort: string) => {
        if (nextSort !== null) {
            setSortCriteria(nextSort);
            setSortDescending(true);
        } else {
            setSortDescending(!sortDescending);
        }
    };
    const handleChangeCategory = (_event: MouseEvent<HTMLElement>, nextCategory: string) => {
        const queries = Object.fromEntries([...searchParams]);
        setSearchParams({ ...queries, category: nextCategory || "" });
        handleClose(false);
    };
    const getSortDirectionIcon = (name: string) => {
        return sortCriteria === name ? sortDescending ? <ArrowDropDown /> : <ArrowDropUp /> : null;
    };
    const sortTypes = ["popular", "date", "name"];
    const categories = Categories.map((cat) => cat.name).sort();

    const applyFilters = () => {
        const queries = Object.fromEntries([...searchParams]);
        setSearchParams({ ...queries, sortBy: sortCriteria, tags, limit: "", descending: sortDescending });
        handleClose(false);
    };
    const clearAllFilters = () => {
        setSearchParams({ searchQuery: searchParams.get("searchQuery") || "" });
        handleClose(false);
    };
    return (
        <Paper elevation={2} sx={{ padding: "1rem" }}>
            {!mobileView ? (
                <Typography variant="subtitle1" display={"flex"} alignItems={"center"} justifyContent={"center"}>
                    <FilterList fontSize="small" /> Filter
                </Typography>
            ) : null}
            <Stack spacing={3}>
                <span>
                    <Typography variant="body1" display={"flex"} justifyContent={"center"}>
                        Sort By
                    </Typography>
                    <ToggleButtonGroup
                        size="small"
                        value={sortCriteria}
                        fullWidth
                        exclusive
                        onChange={handleChangeSort}
                    >
                        {sortTypes.map((sortType) => {
                            return (
                                <ToggleButton
                                    size="small"
                                    fullWidth
                                    value={sortType}
                                    aria-label={sortType}
                                    key={sortType}
                                >
                                    {sortType.toUpperCase()} {getSortDirectionIcon(sortType)}
                                </ToggleButton>
                            );
                        })}
                    </ToggleButtonGroup>
                </span>
                <Accordion defaultExpanded={!mobileView}>
                    <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>Categories</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ToggleButtonGroup
                            size="small"
                            value={searchParams.get("category")}
                            fullWidth
                            orientation="vertical"
                            exclusive
                            onChange={handleChangeCategory}
                        >
                            {categories.map((category) => {
                                return (
                                    <ToggleButton fullWidth value={category} aria-label={category} key={category}>
                                        {category.toUpperCase()}
                                    </ToggleButton>
                                );
                            })}
                        </ToggleButtonGroup>
                    </AccordionDetails>
                </Accordion>
                <FreeTextDropDown freeSolo={false} selectedValues={[...tags]} setSelectedValues={setTags} />
                <span>
                    <Button onClick={clearAllFilters}>Clear All</Button>
                    <Button onClick={applyFilters} variant="contained">
                        Apply Filters
                    </Button>
                </span>
            </Stack>
        </Paper>
    );
};

export default SearchFilters;
