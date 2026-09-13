import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';
import theme from "../../../../core/theme/darkTheme";
import { deleteUserData } from "../../data/datasources/admin_local_data_source";

interface AdminTableToolbarProps {
  numSelected: number;
  openFilterMenu: Function,
  deleteUserData: () => void,
}

export default function AdminTableToolbar({numSelected, openFilterMenu, deleteUserData}: AdminTableToolbarProps) {
  return (
    <Toolbar sx={[
        {pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, bgcolor: theme.palette.background.default,  borderTopLeftRadius: '20px',  borderTopRightRadius: '20px'},
        numSelected > 0 && {bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)},
      ]}>
        
      {numSelected > 0 && (
        <Typography variant="subtitle1" component="div"
          sx={{color: 'inherit', flex: '1 1 100%'}}>

          {numSelected} выбрано
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" followCursor onClick={deleteUserData}>
          <IconButton>
            <DeleteIcon sx={{color: theme.palette.text.primary}}/>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Фильтр"  followCursor onClick={() => openFilterMenu()}>
          <IconButton sx={{ml: 'auto'}}>
            <FilterListIcon sx={{color: theme.palette.text.primary}}/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}