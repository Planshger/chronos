import { Autocomplete, Box, CSSObject, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { memo } from "react";

interface AutocompleteListProps {
    id: string,
    label: string,
    onChange: (value: string, id: string) => void,
    options: string[],
    value: string | undefined,
    variant?: 'standard' | 'outlined' | 'filled',
    sx?: CSSObject,
}

function AutocompleteList({id, label, onChange, options, value, variant = 'outlined', sx}: AutocompleteListProps) {
    return (
        <Box sx={sx}>
            <Autocomplete id={`${id}-autocomplete`} autoComplete disableClearable options={options} value={value} onChange={(event, newValue) => {onChange(newValue ?? '', id);}} noOptionsText="Ничего не найдено"
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        variant={variant}
                        label={label} 
                        sx={{
                            '& .MuiAutocomplete-popupIndicator': {color: 'grey.500'}, 
                            '& input::-webkit-contacts-auto-fill-button': {visibility: 'hidden'},
                        }}
                    />
                )}
            />
        </Box>
    );
}

export default memo(AutocompleteList);