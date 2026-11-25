import { IconButton, Tooltip, Typography, useTheme } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import { TableToolbarRoot } from './AdminTable.style';

interface AdminTableToolbarProps {
  numSelected: number;
  openFilterMenu: () => void;
  deleteUserData: () => void;
}

export default function AdminTableToolbar({ numSelected, openFilterMenu, deleteUserData }: AdminTableToolbarProps) {
  const theme = useTheme();

  return (
    <TableToolbarRoot hasSelection={numSelected > 0}>
      {numSelected > 0 && (
        <Typography variant="subtitle1" component="div" sx={{ color: 'inherit', flex: '1 1 100%' }}>
          {numSelected} выбрано
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" followCursor onClick={deleteUserData}>
          <IconButton>
            <DeleteIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Фильтр" followCursor onClick={() => openFilterMenu()}>
          <IconButton sx={{ ml: 'auto' }}>
            <FilterListIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Tooltip>
      )}
    </TableToolbarRoot>
  );
}
