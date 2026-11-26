import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { memo, useState } from 'react';
import { AdminTableField, SortOrder } from '../../models/sort_model';
import type { SortField } from '../../models/sort_model';

export interface HeadCell {
  id: SortField;
  label: string;
}

export const headCells: readonly HeadCell[] = [
  { id: AdminTableField.Name, label: 'Пользователь' },
  { id: AdminTableField.Email, label: 'Почта' },
  { id: AdminTableField.Plan, label: 'Тариф' },
  { id: AdminTableField.Status, label: 'Статус' },
  { id: AdminTableField.Role, label: 'Роль' },
];

interface AdminTableProps {
  numSelected: number;
  onSort: (id: SortField, order: SortOrder) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function AdminTableHead({ onSelectAllClick, numSelected, rowCount, onSort }: AdminTableProps) {
  const [orderBy, setOrderBy] = useState<SortField | ''>('');
  const [order, setOrder] = useState<SortOrder>(SortOrder.Desc);

  const handleSort = (id: SortField) => {
    const isAsc = orderBy === id && order === SortOrder.Asc;
    const newOrder: SortOrder = isAsc ? SortOrder.Desc : SortOrder.Asc;

    setOrder(newOrder);
    setOrderBy(id);
    onSort(id, newOrder);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{ input: { 'aria-label': 'select all desserts' } }}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === AdminTableField.Name ? 'left' : 'center'}
            padding={headCell.id === AdminTableField.Name ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : SortOrder.Asc}
              onClick={() => handleSort(headCell.id)}
            >
              {headCell.label.toUpperCase()}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell key="edit" align="left" padding="normal" />
      </TableRow>
    </TableHead>
  );
}

export default memo(AdminTableHead);
