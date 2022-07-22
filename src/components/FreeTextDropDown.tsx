import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Dispatch, useState } from "react";
import { Chip, CircularProgress } from "@mui/material";
import { api } from "../helpers/apiHelpers";
import * as _ from "lodash";

const filter = createFilterOptions<FreeSoloType>();

interface FreeSoloType {
    value: string;
    title?: string;
}

interface FreeTextDropDownProps {
    selectedValues: string[];
    setSelectedValues: Dispatch<string[]>;
    freeSolo?: boolean;
}

const FreeTextDropDown = (props: FreeTextDropDownProps) => {
    const { selectedValues, setSelectedValues, freeSolo = true } = props;

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [options, setOptions] = React.useState<string[]>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        const fetchTags = _.debounce(async () => {
            try {
                const res = await api.get(`/search/getTags?tag=${search}`);
                if (res.status === 200) {
                    const tags = res.data;
                    setOptions([...tags]);
                }
            } catch (err: any) {
                throw new Error(err);
            }
        }, 2000);

        if (active) {
            fetchTags();
        }
        return () => {
            active = false;
        };
    }, [loading, search]);

    const handleChange = (e: any) => {
        setSearch(e.target.value);
    };

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
            setSearch("");
        }
    }, [open]);

    return (
        <React.Fragment>
            <Autocomplete
                sx={{ flex: 1 }}
                id="here"
                size="small"
                fullWidth
                multiple
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                isOptionEqualToValue={(option, value) => {
                    return option.value.toLowerCase() === value.value.toLowerCase();
                }}
                onClose={() => {
                    setOpen(false);
                }}
                value={
                    selectedValues.map((option) => {
                        return {
                            value: option,
                            title: option,
                        };
                    }) as FreeSoloType[]
                }
                loading={loading}
                options={
                    options.map((option) => {
                        return {
                            value: option,
                            title: option,
                        };
                    }) as FreeSoloType[]
                }
                onChange={(event, selected) => {
                    setSelectedValues(
                        selected.map((value) => {
                            if (typeof value === "string") {
                                return value;
                            }
                            return value.value;
                        })
                    );
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (
                        freeSolo &&
                        params.inputValue !== "" &&
                        !options.some((option) => option.value === params.inputValue)
                    ) {
                        filtered.push({
                            value: params.inputValue,
                            title: `${"Add"} "${params.inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                getOptionLabel={(option) => {
                    if (typeof option === "string") {
                        return option;
                    }
                    return option.value;
                }}
                selectOnFocus
                renderTags={(value: readonly FreeSoloType[], getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" size="small" label={option.value} {...getTagProps({ index })} />
                    ))
                }
                handleHomeEndKeys
                renderOption={(props, option) => {
                    return <li {...props}>{option.title}</li>;
                }}
                freeSolo={freeSolo}
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            label="Tags"
                            value={search}
                            onChange={handleChange}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    );
                }}
            />
        </React.Fragment>
    );
};

export default FreeTextDropDown;
