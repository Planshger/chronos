import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FilterValuesProps } from "./table/AdminTableFilterMenu";
import { memo } from "react";

interface DropdownListProps {
    id: string,
    label: string,
    width?: number,
    onChange: (event: SelectChangeEvent<string>, id: string) => void,
    menuItems: string[],
    filterValues: FilterValuesProps[],
}

function DropdownList({id, label, width, onChange, menuItems, filterValues}: DropdownListProps) {
    return (
        <Box sx={{ minWidth: width, p: 1}}>
            <FormControl fullWidth>
                <InputLabel id={id}>{label}</InputLabel>
                
                <Select labelId={id} id={`${id}-select`} value={filterValues.find((i) => i.id == id)?.value} label={label} onChange={(event) => onChange(event, id)} sx={{'& .MuiSelect-icon': {color: 'grey.500'},}}>
                    {menuItems.length != 0 ? menuItems.map((item) => {
                       return <MenuItem value={item}>{item}</MenuItem>
                    }) : null}
                </Select>
            </FormControl>
        </Box>
    );
}

export default memo(DropdownList);