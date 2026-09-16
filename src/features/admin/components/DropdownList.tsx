import { Box, CSSObject, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { memo } from "react";

interface DropdownListProps {
    id: string,
    label: string,
    onChange: (event: SelectChangeEvent<string>, id: string) => void,
    menuItems: string[],
    value: string | undefined,
    variant?: 'standard' | 'outlined' | 'filled',
    sx?: CSSObject,
}

function DropdownList({id, label, onChange, menuItems, value, variant = 'outlined', sx}: DropdownListProps) {
    return (
        <Box sx={sx}>
            <FormControl fullWidth variant={variant}>
                <InputLabel id={id}>{label}</InputLabel>
                
                <Select labelId={id} id={`${id}-select`} value={value} label={label} onChange={(event) => onChange(event, id)} sx={{'& .MuiSelect-icon': {color: 'grey.500'},}}>
                    {menuItems.length != 0 ? menuItems.map((item) => {
                       return <MenuItem value={item}>{item}</MenuItem>
                    }) : null}
                </Select>
            </FormControl>
        </Box>
    );
}

export default memo(DropdownList);