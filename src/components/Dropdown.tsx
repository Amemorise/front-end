import { FormControl, InputLabel, Select, OutlinedInput, Box, Chip, MenuItem, SelectChangeEvent, Theme, useTheme } from "@mui/material";
import { Dispatch } from "react";

interface DropdownProps {
    values: string[];
    selectedValues: string[];
    setSelectedValues: Dispatch<string[]>;
}
const Dropdown = ({ values, selectedValues, setSelectedValues }: DropdownProps) => {
    const theme = useTheme();

    function getStyles(value: string, selectedValues: readonly string[], theme: Theme) {
        return {
            fontWeight: selectedValues.indexOf(value) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
        };
    }
    const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
        const {
            target: { value },
        } = event;
        setSelectedValues(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };
    return (
        <FormControl sx={{ flex: 1, marginLeft: 1 }} size={"small"}>
            <InputLabel id="collection-tags-label">Tags</InputLabel>
            <Select
                labelId="collection-tags-label"
                id="collection-tags"
                multiple
                multiline
                maxRows={4}
                value={selectedValues}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-Tags" label="Tags" />}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip size={"small"} key={value} label={value} />
                        ))}
                    </Box>
                )}
            >
                {values.map((value) => (
                    <MenuItem key={value} value={value} style={getStyles(value, selectedValues, theme)}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default Dropdown;
