import { deleteUserData, getFilterData, getSortBy, getUsersWithPagination } from '../../datasources/admin_data_source';
import { IconButton, Stack, Switch, TextField, useTheme } from '@mui/material';
import UserModel, { initialUser } from '../../../../shared/models/user_model';
import { PaginationModel } from '../../models/user_pagination_model';
import { withLoading } from '../../../../shared/utils/withLoading';
import { useApiError } from '../../../../shared/errors/ApiError';
import { updateUserData } from '../../../../shared/api/userApi';
import TableContainer from '@mui/material/TableContainer';
import AdminTablePagination from './AdminTablePagination';
import AdminTableEditMenu from './menu/AdminTableEditMenu';
import AdminTableToolbar from './AdminTableToolbar';
import AutocompleteList from '../AutocompleteList';
import Loader from '../../../../shared/ui/Loader';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import AdminTableHead from './AdminTableHead';
import { Edit } from '@mui/icons-material';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AdminTableFilterMenu, { FilterValuesProps } from './menu/AdminTableFilterMenu';
import { SearchFields, SearchRow } from './AdminTable.style';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

const initialUsersProps: PaginationModel = {
  items: [],
  meta: { total_items: 0, total_pages: 0, current_page: 1, per_page: 5, remaining_count: 0 },
};

export default function AdminTable() {
  const theme = useTheme();
  const [data, setData] = useState<PaginationModel>(initialUsersProps);
  const [selected, setSelected] = useState<number[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { showError } = useApiError();
  const [editDomain, setEditDomain] = useState(false);
  const [domain, setDomain] = useState('@example.com');
  const [openEdit, setOpenEdit] = useState<{ open: boolean; user: UserModel }>({
    open: false,
    user: initialUser,
  });
  const [input, setInput] = useState<FilterValuesProps>({
    id: 'name',
    value: '',
  } as FilterValuesProps);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const switchFilterMenu = useCallback(() => {
    setOpenFilter((prev) => !prev);
  }, []);

  const switchEditMenu = useCallback((user?: UserModel) => {
    setOpenEdit((prev) => {
      if (user) return { open: !prev.open, user };
      return { open: !prev.open, user: prev.user };
    });
  }, []);

  const handleInput = useCallback(
    (value: string, id: string) => {
      setInput({ id: id, value: value });
      withLoading(
        () => getFilterData(data.meta.current_page, data.meta.per_page, [{ id: id, value: value }]).then((res) => setData(res)),
        setLoading,
      ).catch(showError);
    },
    [data, showError],
  );

  const searchWithEmail = useCallback(
    (value: string) => {
      withLoading(
        () => getFilterData(data.meta.current_page, data.meta.per_page, [{ id: 'email', value: value }]).then((res) => setData(res)),
        setLoading,
      ).catch(showError);
    },
    [data.meta.current_page, data.meta.per_page, showError],
  );

  const switchSearchWithDomain = useCallback(
    (e: ChangeEvent<HTMLInputElement, Element>) => {
      const isON = e.target.checked;
      setEditDomain(isON);
      if (input.value !== '') {
        if (isON) {
          searchWithEmail(input.value + domain);
        } else {
          handleInput(input.value, 'name');
        }
      }
    },
    [input.value, domain, handleInput, searchWithEmail],
  );

  const loadDataWithPagination = useCallback(
    (page: number, limit: number) => {
      withLoading(() => getUsersWithPagination(page, limit).then((res) => setData(res)), setLoading).catch(showError);
    },
    [showError],
  );

  const loadDataSortBy = useCallback(
    (sortName: string, order?: 'asc' | 'desc') => {
      withLoading(
        () => getSortBy(sortName, data.meta.current_page, data.meta.per_page, order).then((res) => setData(res)),
        setLoading,
      ).catch(showError);
    },
    [data.meta.current_page, data.meta.per_page, showError],
  );

  const loadDataWithDeleteUser = useCallback(async () => {
    try {
      await deleteUserData(selected);
      setSelected([]);
      loadDataWithPagination(data.meta.current_page, data.meta.per_page);
    } catch (error) {
      showError(error);
    }
  }, [selected, data.meta.current_page, data.meta.per_page, loadDataWithPagination, showError]);

  const loadDataWithEditUser = useCallback(
    async (user: UserModel) => {
      try {
        await updateUserData(user);
        loadDataWithPagination(data.meta.current_page, data.meta.per_page);
      } catch (error) {
        showError(error);
      }
    },
    [data.meta.current_page, data.meta.per_page, loadDataWithPagination, showError],
  );

  const handleSelectAllClick = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target.checked) {
        const newSelected = data.items.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    [data.items],
  );

  const handleClick = useCallback((id: number) => {
    setSelected((prev) => {
      const selectedIndex = prev.indexOf(id);
      if (selectedIndex === -1) {
        return [...prev, id];
      }
      return prev.filter((item) => item !== id);
    });
  }, []);

  const debouncedSearch = useCallback(
    (searchWithEmailValue: string) => {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        searchWithEmail(searchWithEmailValue);
      }, 800);
    },
    [searchWithEmail],
  );

  const openEditMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, user: UserModel) => {
    e.stopPropagation();
    switchEditMenu(user);
  };

  useEffect(() => {
    loadDataWithPagination(initialUsersProps.meta.current_page, initialUsersProps.meta.per_page);
  }, [loadDataWithPagination]);

  useEffect(() => {
    return () => {
      if (timeout.current !== null) clearTimeout(timeout.current);
    };
  }, []);

  return (
    <Box sx={{ width: '100%', p: { xs: 1.5, lg: 10 } }}>
      <SearchRow>
        <SearchFields direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <AutocompleteList
            key={editDomain ? 'email' : 'name'}
            id={editDomain ? 'email' : 'name'}
            label="Поиск"
            disableClearable={false}
            options={data.items.map((i) => i.name)}
            onChange={handleInput}
            value={input.value}
          />

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexShrink: 0 }}>
            <TextField
              value={domain}
              onChange={(e) => {
                setDomain(e.target.value);
                debouncedSearch(input.value + e.target.value);
              }}
              disabled={!editDomain}
              size="small"
              variant="standard"
              sx={{
                width: { xs: '100%', sm: 160 },
                flex: { xs: 1, sm: 'none' },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: theme.palette.text.secondary,
                },
              }}
            />

            <Switch checked={editDomain} onChange={(e) => switchSearchWithDomain(e)} size="small" />
          </Stack>
        </SearchFields>
      </SearchRow>

      <Paper sx={{ width: '100%', mb: 2, borderRadius: '20px' }}>
        <AdminTableToolbar numSelected={selected.length} openFilterMenu={switchFilterMenu} deleteUserData={loadDataWithDeleteUser} />

        <TableContainer sx={{ bgcolor: theme.palette.background.default, maxWidth: '100%', overflowX: 'auto' }}>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <AdminTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={data.items.length}
              onSort={loadDataSortBy}
            />

            <TableBody>
              {data.items.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: 'pointer',
                      '& .edit-button': { opacity: 0, transition: 'opacity 0.15s ease' },
                      '&:hover .edit-button': { opacity: 1 },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} slotProps={{ input: { 'aria-labelledby': labelId } }} />
                    </TableCell>

                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>

                    <TableCell align="center">{row.email}</TableCell>

                    <TableCell align="center">{row.plan}</TableCell>

                    <TableCell align="center">{row.status}</TableCell>

                    <TableCell align="center">{row.role}</TableCell>

                    <TableCell align="left" padding="none">
                      <IconButton className="edit-button" size="small" onClick={(e) => openEditMenu(e, row)}>
                        <Edit fontSize="small" sx={{ color: theme.palette.text.primary }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <AdminTablePagination loadDataWithPagination={loadDataWithPagination} meta={data} />

        <AdminTableFilterMenu
          onClose={switchFilterMenu}
          open={openFilter}
          setData={setData}
          currentPage={data.meta.current_page}
          perPage={data.meta.per_page}
          searchProp={input.value}
        />

        <AdminTableEditMenu onClose={switchEditMenu} open={openEdit.open} user={openEdit.user} onClick={loadDataWithEditUser} />

        {loading && <Loader size={80} />}
      </Paper>
    </Box>
  );
}
