import { Box, Button, IconButton, Modal, SelectChangeEvent, Stack, Typography } from "@mui/material";
import DropdownList from "../DropdownList";
import { memo, useCallback, useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import theme from "../../../../core/theme/darkTheme";
import { headCells } from "./AdminTableHead";
import { getFilterData } from "../../../../core/datasources/admin_data_source";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg: 400, xs: 370},
  bgcolor: 'background.paper',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: 24,
  borderRadius: '20px',
  p: 5,
};

export interface FilterValuesProps {
    id: string,
    value: string,
}

interface AdminTableFilterMenuProps {
    onClose: () => void,
    open: boolean,
    setData: Function,
    currentPage: number,
    perPage: number,
    searchProp: string,
}

const initialprops = [{id: 'email', value: ''},{id: 'plan', value: ''},{id: 'status', value: ''}];

const menuItems = new Map<string, string[]>([['status', ['Активен', 'Заблокирован', 'Ожидает']], ['plan', ['Базовый', 'Премиум', 'Пробный']]]);

function AdminTableFilterMenu({onClose, open, setData, perPage, currentPage, searchProp}: AdminTableFilterMenuProps) {
    const [filterValues, setFilterValues] = useState<FilterValuesProps[]>(initialprops);

    const handleChange = useCallback((e: SelectChangeEvent<string>, id: string) => {
        setFilterValues((prev) =>
            prev.map((f) => {
                if (f.id === id) return { ...f, value: e.target.value };
                return f;
            })
        );
    }, []);

    const loadDataFromFilter = useCallback(() => {
        getFilterData(currentPage, perPage, filterValues).then(res => setData(res));
        onClose();
    }, [filterValues, currentPage, perPage, onClose])

    useEffect(() => {setFilterValues((prev) => [...prev, {id: 'name', value: searchProp}])}, [searchProp])

    return (
        <Modal open={open} onClose={(reason) => {if(reason !== 'backdropClick') return; onClose();}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <IconButton aria-label="close" onClick={onClose} sx={{position: 'absolute', top: 8, right: 8, color: (theme) => theme.palette.grey[500]}}>
                    <Close />
                </IconButton>
                
                <Typography variant="h6" align="center" sx={{mt: 2, mb: 2}}>Фильтр пользователей</Typography>

                {headCells.map((item) => {
                    if(menuItems.has(item.id)) {
                        return <DropdownList key={item.id} id={item.id} label={item.label} menuItems={menuItems.get(item.id) ?? []} onChange={handleChange} value={filterValues.find((i) => i.id == item.id)?.value} sx={{p: 1}}/>
                    }
                })}

                <Stack direction={'row'} spacing={2} sx={{mt: 3, justifyContent: 'center'}}>
                    <Button variant="contained" onClick={loadDataFromFilter} color="primary"  sx={{color: theme.palette.text.primary}}>
                        Сохранить
                    </Button>

                    <Button variant="outlined" color="secondary" onClick={() => {setFilterValues([...initialprops, {id: 'name', value: searchProp}]);}}>
                        Очистить
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default memo(AdminTableFilterMenu);