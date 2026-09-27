import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import theme from '../../../../core/theme/darkTheme';

import { PaginationModel } from '../../models/pagination_model';
import AdminTableFilterMenu, { FilterValuesProps } from './AdminTableFilterMenu';
import AdminTableToolbar from './AdminTableToolbar';
import AdminTableHead, { headCells } from './AdminTableHead';
import AdminTablePagination from './AdminTablePagination';
import Loader from '../../../../core/components/Loader';
import { Edit } from '@mui/icons-material';
import { IconButton, Stack, Switch, TextField } from '@mui/material';
import AdminTableEditMenu from './AdminTableEditMenu';
import UserModel from '../../models/user_model';
import AutocompleteList from '../AutocompleteList';
import { deleteUserData, getFilterData, getSortBy, getUsersWithPagination, Loading, updateUserData } from '../../../../core/datasources/admin_data_source';

const initialUsersProps: PaginationModel = {items: [], meta: {  total_items: 0, total_pages: 0, current_page: 1, per_page: 5, remaining_count: 0}};

export default function AdminTable() {
  const [data, setData] = React.useState<PaginationModel>(initialUsersProps);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [openFilter, setOpenFilter] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [editDomain, setEditDomain] = React.useState(false);
  const [domain, setDomain] = React.useState('@example.com');
  const [openEdit, setOpenEdit] = React.useState<{open: boolean, user: UserModel}>({open: false, user: {id: 0, name: '', email: '', plan: '', status: ''}});
  const [input, setInput] = React.useState<FilterValuesProps>({id: 'name', value: ''} as FilterValuesProps);
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchFilterMenu = React.useCallback(() => {setOpenFilter((prev) => !prev)}, []);

  const switchEditMenu = React.useCallback((user?: UserModel) =>  {
    setOpenEdit((prev) => {
      if (user) return { open: !prev.open, user };
      else return { open: !prev.open, user: prev.user };
    });
  }, []);

  const switchSearchWithDomain = React.useCallback((e: React.ChangeEvent<HTMLInputElement, Element>) => {
    const isON = e.target.checked
    setEditDomain(isON); 
    if(input.value !== '') {
      if(isON) {
        searchWithEmail(input.value+domain);
      } else {
        handleInput(input.value, 'name');
      }
    } 
  }, [input.value, domain])
  
  const loadDataWithPagination = React.useCallback((page: number, limit: number) => {
    Loading(() => getUsersWithPagination(page, limit).then((res) => setData(res)), setLoading);
  }, []);

  const loadDataSortBy = React.useCallback((sortName: string, order?: 'asc' | 'desc') => {
    Loading(() => getSortBy(sortName, data.meta.current_page, data.meta.per_page, order).then(res => setData(res)), setLoading);
  }, [data]);

  const loadDataWithDeleteUser = React.useCallback(async () => {
    await deleteUserData(selected); 
    setSelected([]);
    loadDataWithPagination(data.meta.current_page, data.meta.per_page);
  }, [selected, data]);

  const loadDataWithEditUser = React.useCallback(async (user: UserModel) => {
    await updateUserData(user);
    loadDataWithPagination(data.meta.current_page, data.meta.per_page);
  }, [data]);

  const handleSelectAllClick = React.useCallback(({target}: React.ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      const newSelected = data.items.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, [data]);

  const handleInput = React.useCallback((value: string, id: string ) => {
    setInput({id: id, value: value});
    Loading(() => getFilterData(data.meta.current_page, data.meta.per_page, [{id: id, value: value}]).then((res) => setData(res)), setLoading);
  }, [data]);

  const handleClick = React.useCallback((id: number) => {
    setSelected((prev) => {
        const selectedIndex = prev.indexOf(id);
        if (selectedIndex === -1) {return [...prev, id];}
        return prev.filter((item) => item !== id);
    });
  }, []);

  const searchWithEmail = (value: string) => {
    Loading(() => getFilterData(data.meta.current_page, data.meta.per_page, [{id: 'email', value: value}]).then((res) => setData(res)), setLoading);
  }

  const debouncedSearch = React.useCallback((searchWithEmailValue: string) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      searchWithEmail(searchWithEmailValue);
    }, 800);
  }, []);

  React.useEffect(() => {loadDataWithPagination(data.meta.current_page, data.meta.per_page);}, []);

  return (
    <Box sx={{ width: '100%', p: {xs: 1.5, lg: 10}, }}>
      <Box sx={{ pb: 2, display: 'flex', justifyContent: 'center' }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <AutocompleteList key={editDomain ? 'email' : 'name'} id={editDomain ? 'email' : 'name'} label="Поиск" disableClearable={false} options={data.items.map((i) => i.name)} onChange={handleInput} value={input.value} sx={{ width: '500px' }} />
          
          <TextField value={domain} onChange={(e) => {setDomain(e.target.value); debouncedSearch(input.value+e.target.value);}} disabled={!editDomain} size="small" variant="standard" sx={{ width: 160, '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.secondary }}} />
              
          <Switch checked={editDomain} onChange={(e) => {switchSearchWithDomain(e)}} size="small" />
        </Stack>
      </Box>

      <Paper sx={{ width: '100%', mb: 2, borderRadius: '20px'}}>
        <AdminTableToolbar numSelected={selected.length} openFilterMenu={switchFilterMenu} deleteUserData={loadDataWithDeleteUser}/>

        <TableContainer sx={{bgcolor: theme.palette.background.default}}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <AdminTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={data.items.length} onSort={loadDataSortBy}/>
            
            <TableBody>
              {data.items.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover onClick={() => handleClick(row.id)} role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={row.id} selected={isItemSelected} sx={{cursor: 'pointer',  '& .edit-button': {opacity: 0, transition: 'opacity 0.15s ease'},'&:hover .edit-button': {opacity: 1}}}>
                    <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isItemSelected} slotProps={{input: { 'aria-labelledby': labelId }}}/>
                    </TableCell>

                    <TableCell component="th" id={labelId} scope="row" padding="none">{row.name}</TableCell>

                    <TableCell align="center">{row.email}</TableCell>

                    <TableCell align="center">{row.plan}</TableCell>

                    <TableCell align="center">{row.status}</TableCell>

                    <TableCell align="center">{row.role}</TableCell>

                    <TableCell align="left" padding="none">
                      <IconButton className="edit-button" size="small" onClick={(e) => {e.stopPropagation(); switchEditMenu(row);}}>
                        <Edit fontSize="small" sx={{color: theme.palette.text.primary}}/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <AdminTablePagination loadDataWithPagination={loadDataWithPagination} meta={data}/>

        <AdminTableFilterMenu onClose={switchFilterMenu} open={openFilter} setData={setData} currentPage={data.meta.current_page} perPage={data.meta.per_page} searchProp={input.value}/>

        <AdminTableEditMenu onClose={switchEditMenu} open={openEdit.open} user={openEdit.user} onClick={loadDataWithEditUser}/>

        {loading && (
          <Loader size={80} />
        )}
      </Paper>
    </Box>
  );
}
