import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Dispatch } from "react";
import { Chip } from "@mui/material";

const filter = createFilterOptions<FreeSoloType>();

interface FreeSoloType {
    value: string;
    title?: string;
}

interface FreeTextDropDownProps {
    values: string[];
    selectedValues: string[];
    setSelectedValues: Dispatch<string[]>;
}

const FreeTextDropDown = (props: FreeTextDropDownProps) => {
    const { values, selectedValues, setSelectedValues } = props;

    return (
        <React.Fragment>
            <Autocomplete
                sx={{ flex: 1 }}
                size="small"
                multiple
                value={
                    selectedValues.map((option) => {
                        return {
                            value: option,
                            title: option,
                        };
                    }) as FreeSoloType[]
                }
                options={
                    values
                        .filter((option) => {
                            return !selectedValues.includes(option);
                        })
                        .map((option) => {
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
                    if (params.inputValue !== "") {
                        filtered.push({
                            value: params.inputValue,
                            title: `${"Add"} "${params.inputValue}"`,
                        });
                    }
                    return filtered;
                }}
                id="free-solo-dialog-demo"
                getOptionLabel={(option) => {
                    if (typeof option === "string") {
                        return option;
                    }
                    return option.value;
                }}
                selectOnFocus
                clearOnBlur
                renderTags={(value: readonly FreeSoloType[], getTagProps) => value.map((option, index) => <Chip variant="outlined" size="small" label={option.value} {...getTagProps({ index })} />)}
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.title}</li>}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Tags" />}
            />
        </React.Fragment>
    );
};

export default FreeTextDropDown;
