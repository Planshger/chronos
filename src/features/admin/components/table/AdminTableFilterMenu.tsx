import { Box, Button, IconButton, Modal, SelectChangeEvent, Stack, Typography } from "@mui/material";
import DropdownList from "../DropdownList";
import { memo, useCallback, useEffect, useState } from "react";
import UsersModel from "../../data/models/user_model";
import { getAllUsers, getFilterData, getUsersWithPagination } from "../../data/datasources/admin_local_data_source";
import { Close } from "@mui/icons-material";
import theme from "../../../../core/theme/darkTheme";
import { headCells } from "./AdminTableHead";
import AutocompleteList from "../AutocompleteList";

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
}

const initialprops = [{id: 'name', value: ''},{id: 'email', value: ''},{id: 'plan', value: ''},{id: 'status', value: ''}]

function AdminTableFilterMenu({onClose, open, setData, perPage, currentPage}: AdminTableFilterMenuProps) {
    const [dataFromFilter, setDataFromFilter] = useState<UsersModel[]>([] as UsersModel[])
    const [filterValues, setFilterValues] = useState<FilterValuesProps[]>(initialprops);

    const handleChange = useCallback((e: SelectChangeEvent<string>, id: string) => {
        setFilterValues((prev) =>
            prev.map((f) => {
                if (f.id === id) return { ...f, value: e.target.value };
                return f;
            })
        );
    }, []);

    const handleInput = useCallback((value: string, id: string ) => {
        setFilterValues((prev) =>
            prev.map((f) => {
                if (f.id === id) return { ...f, value: value };
                return f;
            })
        );
    }, [])

    const loadDataFromFilter = useCallback(() => {
        if(filterValues.some((f) => (f.value !== ''))) {
            getFilterData(currentPage, perPage, filterValues).then(res => setData(res));
        } 
        onClose();
    }, [filterValues, currentPage, perPage, onClose])

    useEffect(() => {getAllUsers().then(res => setDataFromFilter(res))}, []);

    return (
        <Modal open={open} onClose={(reason) => {if(reason !== 'backdropClick') return; onClose();}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <IconButton aria-label="close" onClick={onClose} sx={{position: 'absolute', top: 8, right: 8, color: (theme) => theme.palette.grey[500]}}>
                    <Close />
                </IconButton>

                <Typography variant="h6" align="center" sx={{mt: 2, mb: 2}}>Фильтр пользователей</Typography>

                {headCells.map((item) => {
                    const key = item.id as keyof UsersModel;
                    const menuItems: string[] = [];

                    if(item.id == 'status') {
                        menuItems.push('Активен', 'Заблокирован', 'Ожидает')
                    } else if(item.id == 'plan') {
                        menuItems.push('Базовый', 'Премиум', 'Пробный')
                    } else {
                        dataFromFilter.map((i) => {menuItems.push(i[key].toString())});
                        return <AutocompleteList key={key} id={key.toString()} label={item.label} options={menuItems} onChange={handleInput} value={filterValues.find((i) => i.id == key.toString())?.value} sx={{p: 1}}/>
                    }
                    return <DropdownList key={key} id={key.toString()} label={item.label} menuItems={menuItems} onChange={handleChange} value={filterValues.find((i) => i.id == key.toString())?.value} sx={{p: 1}}/>
                })}

                <Stack direction={'row'} spacing={2} sx={{mt: 3, justifyContent: 'center'}}>
                    <Button variant="contained" onClick={loadDataFromFilter} color="primary"  sx={{color: theme.palette.text.primary}}>
                        Сохранить
                    </Button>

                    <Button variant="outlined" color="secondary" onClick={() => {setFilterValues(initialprops); getUsersWithPagination(currentPage, perPage).then(res => setData(res));}}>
                        Очистить
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
}

export default memo(AdminTableFilterMenu);