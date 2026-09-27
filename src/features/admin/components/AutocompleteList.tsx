import { Autocomplete, Box, CSSObject, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { memo, useState } from "react";
import theme from "../../../core/theme/darkTheme";
import { Search } from "@mui/icons-material";

interface AutocompleteListProps {
    id: string,
    label?: string,
    onChange: (value: string, id: string) => void,
    options: string[],
    value: string | undefined,
    variant?: 'standard' | 'outlined' | 'filled',
    sx?: CSSObject,
    disableClearable: boolean;
}

function AutocompleteList({id, label, onChange, options, value, variant = 'standard', sx, disableClearable}: AutocompleteListProps) {
    return (
        <Stack direction={'row'} spacing={1}>
            <Search sx={{pt: 0.3}}/>
            <Autocomplete id={`${id}-autocomplete`} sx={{width: {lg: '400px', xs:'300px'}}} autoComplete disableClearable={disableClearable} freeSolo options={options} value={value} onChange={(event, newValue) => {onChange(newValue ?? '', id);}}
                slotProps={{paper: {sx: {bgcolor: theme.custom.background.glass, backdropFilter: 'blur(11px)', color: '#f1f5f9', borderBottom: '1px solid rgba(255,255,255,0.08)'}}}}
                renderInput={(params) => (
                    <TextField 
                        {...params}
                        placeholder={label}
                        variant={variant}
                        size="small"
                        sx={{
                            '& .MuiAutocomplete-clearIndicator': {color: theme.palette.text.secondary},
                            '& .MuiAutocomplete-popupIndicator': {color: 'grey.500'}, 
                            '& input::-webkit-contacts-auto-fill-button': {visibility: 'hidden'},
                        }}
                        
                    />
                )}
            />
        </Stack>
    );
}

export default memo(AutocompleteList);