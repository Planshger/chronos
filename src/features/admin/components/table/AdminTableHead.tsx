import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { memo, useState } from "react";

export interface HeadCell {
  id: string;
  label: string;
}

export const headCells: readonly HeadCell[] = [
  { id: 'name', label: 'Пользователь' },
  { id: 'email', label: 'Почта' },
  { id: 'plan', label: 'Тариф' },
  { id: 'status', label: 'Статус' },
];

interface AdminTableProps {
  numSelected: number;
  onSort: (id: string, order: 'asc' | 'desc') => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

function AdminTableHead({ onSelectAllClick, numSelected, rowCount, onSort }: AdminTableProps) {
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    const newOrder: 'asc' | 'desc' = isAsc ? 'desc' : 'asc';

    setOrder(newOrder);
    setOrderBy(id);
    onSort(id, newOrder);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount} onChange={onSelectAllClick} slotProps={{input: {'aria-label': 'select all desserts'}}}/>
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.id === 'name' ? 'left' : 'center'} padding={headCell.id === 'name' ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => handleSort(headCell.id)}>
              {headCell.label.toUpperCase()}
            </TableSortLabel>
          </TableCell>
        ))}
        
         <TableCell key='edit' align='left' padding='normal'/>
      </TableRow>
    </TableHead>
  );
}

export default memo(AdminTableHead);