import {
  Box,
  Button,
  IconButton,
  Modal,
  SelectChangeEvent,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import DropdownList from '../DropdownList';
import { memo, useCallback, useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';
import { headCells } from './AdminTableHead';
import { getFilterData } from '../../datasources/admin_data_source';
import { useApiError } from '../../../../shared/errors/ApiErrorProvider';

export interface FilterValuesProps {
  id: string;
  value: string;
}

interface AdminTableFilterMenuProps {
  onClose: () => void;
  open: boolean;
  setData: Function;
  currentPage: number;
  perPage: number;
  searchProp: string;
}

const initialprops = [
  { id: 'email', value: '' },
  { id: 'plan', value: '' },
  { id: 'status', value: '' },
  { id: 'role', value: '' },
];

const menuItems = new Map<string, string[]>([
  ['status', ['Активен', 'Заблокирован', 'Ожидает']],
  ['plan', ['Базовый', 'Премиум', 'Пробный']],
  ['role', ['user', 'admin']],
]);

function AdminTableFilterMenu({
  onClose,
  open,
  setData,
  perPage,
  currentPage,
  searchProp,
}: AdminTableFilterMenuProps) {
  const [filterValues, setFilterValues] = useState<FilterValuesProps[]>(initialprops);
  const { showError } = useApiError();
  const theme = useTheme();

  const handleChange = useCallback((e: SelectChangeEvent<string>, id: string) => {
    setFilterValues((prev) =>
      prev.map((f) => {
        if (f.id === id) return { ...f, value: e.target.value };
        return f;
      }),
    );
  }, []);

  const loadDataFromFilter = useCallback(async () => {
    try {
      const data = await getFilterData(currentPage, perPage, filterValues);
      setData(data);
      onClose();
    } catch (error) {
      showError(error);
    }
  }, [filterValues, currentPage, perPage, onClose, setData, showError]);

  useEffect(() => {
    setFilterValues((prev) => [...prev, { id: 'name', value: searchProp }]);
  }, [searchProp]);

  return (
    <Modal
      open={open}
      onClose={(reason) => {
        if (reason !== 'backdropClick') return;
        onClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(400px, calc(100vw - 32px))',
          maxHeight: 'calc(100dvh - 32px)',
          overflowY: 'auto',
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: 24,
          borderRadius: '20px',
          p: { xs: 3, sm: 5 },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <Close />
        </IconButton>

        <Typography variant="h6" align="center" sx={{ mt: 2, mb: 2 }}>
          Фильтр пользователей
        </Typography>

        {headCells.map((item) => {
          if (menuItems.has(item.id)) {
            return (
              <DropdownList
                key={item.id}
                id={item.id}
                label={item.label}
                menuItems={menuItems.get(item.id) ?? []}
                onChange={handleChange}
                value={filterValues.find((i) => i.id === item.id)?.value}
                sx={{ p: 1 }}
              />
            );
          }
          return null;
        })}

        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          spacing={2}
          sx={{ mt: 3, justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            onClick={loadDataFromFilter}
            color="primary"
            sx={{ color: theme.palette.text.primary }}
          >
            Сохранить
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setFilterValues([...initialprops, { id: 'name', value: searchProp }]);
            }}
          >
            Очистить
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default memo(AdminTableFilterMenu);
