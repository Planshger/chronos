import { Button, Modal, SelectChangeEvent, Stack, Typography, useTheme } from '@mui/material';
import { PaginationModel } from '../../../models/user_pagination_model';
import { Role, UserStatus, useApiError } from '../../../../../shared';
import { ADMIN_PLAN_OPTIONS } from '../../../constants/adminTableOptions';
import { memo, useCallback, useEffect, useState } from 'react';
import { getFilterData } from '../../../datasources/admin_data_source';
import { Close } from '@mui/icons-material';
import DropdownList from '../../DropdownList';
import { headCells } from '../AdminTableHead';
import { CloseButton, ModalContent } from './AdminTableMenu.style';
import { AdminTableField } from '../../../models/sort_model';

export interface FilterValuesProps {
  id: AdminTableField;
  value: string;
}

interface AdminTableFilterMenuProps {
  onClose: () => void;
  open: boolean;
  setData: (data: PaginationModel) => void;
  currentPage: number;
  perPage: number;
  searchProp: string;
}

const initialprops = [
  { id: AdminTableField.Email, value: '' },
  { id: AdminTableField.Plan, value: '' },
  { id: AdminTableField.Status, value: '' },
  { id: AdminTableField.Role, value: '' },
];

const menuItems = new Map<AdminTableField, string[]>([
  [AdminTableField.Status, Object.values(UserStatus)],
  [AdminTableField.Plan, ADMIN_PLAN_OPTIONS],
  [AdminTableField.Role, Object.values(Role)],
]);

function AdminTableFilterMenu({ onClose, open, setData, perPage, currentPage, searchProp }: AdminTableFilterMenuProps) {
  const [filterValues, setFilterValues] = useState<FilterValuesProps[]>(initialprops);
  const { showError } = useApiError();
  const theme = useTheme();

  const handleChange = useCallback((e: SelectChangeEvent<string>, id: AdminTableField) => {
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
    setFilterValues((prev) => [
      ...prev.filter((filter) => filter.id !== AdminTableField.Name),
      { id: AdminTableField.Name, value: searchProp },
    ]);
  }, [searchProp]);

  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <ModalContent>
        <CloseButton aria-label="close" onClick={onClose}>
          <Close />
        </CloseButton>

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
                onChange={(e) => handleChange(e, item.id)}
                value={filterValues.find((i) => i.id === item.id)?.value}
                sx={{ p: 1 }}
              />
            );
          }
          return null;
        })}

        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2} sx={{ mt: 3, justifyContent: 'center' }}>
          <Button variant="contained" onClick={loadDataFromFilter} color="primary" sx={{ color: theme.palette.text.primary }}>
            Сохранить
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setFilterValues([...initialprops, { id: AdminTableField.Name, value: searchProp }])}
          >
            Очистить
          </Button>
        </Stack>
      </ModalContent>
    </Modal>
  );
}

export default memo(AdminTableFilterMenu);
