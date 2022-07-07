import { FormHelperText, FormControl, InputLabel, MenuItem, Select as Selectable } from "@mui/material";

interface SelectProps {
    values: string[];
    selected: string;
    label: string;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    onChange: (event: any) => void;
    name?: string;
}
const Select = ({ name, values, label, onChange, selected, required, error, helperText }: SelectProps) => {
    return (
        <FormControl sx={{ flex: 1 }} size={"small"} required={required} error={error}>
            <InputLabel id={`select-${label}`}>{label}</InputLabel>
            <Selectable name={name} labelId={`select-${label}`} id={label} value={selected} label={label} onChange={onChange}>
                {values.map((value, index) => {
                    return (
                        <MenuItem key={value + index} value={value}>
                            {value}
                        </MenuItem>
                    );
                })}
            </Selectable>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
        </FormControl>
    );
};

export default Select;
