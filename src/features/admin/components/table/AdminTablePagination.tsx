import { memo } from "react";
import theme from "../../../../core/theme/darkTheme";
import { TablePagination } from "@mui/material";
import { PaginationModel } from "../../../../core/ models/pagination_model";

interface AdminTablePaginationProps {
  loadDataWithPagination: (page: number, limit: number) => void;
  meta: PaginationModel;
}

function AdminTablePagination({loadDataWithPagination, meta}: AdminTablePaginationProps) {
    const page = meta.meta.current_page > 0 ? meta.meta.current_page - 1 : 0;
    const rowsPerPage = meta.meta.per_page || 5;

    const handleChangePage = (event: unknown, newPage: number) => {
        loadDataWithPagination(newPage+1, rowsPerPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        loadDataWithPagination(parseInt(event.target.value) == meta.meta.total_items ? 1 : meta.meta.current_page, parseInt(event.target.value));
    };

    return (
        <TablePagination 
            rowsPerPageOptions={[3, 5, 10, { value: meta.meta.total_items, label: 'Все' }]} 
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`} 
            labelRowsPerPage="Строк на странице:"
            component="div" 
            count={meta.meta.total_items} 
            page={page} 
            rowsPerPage={rowsPerPage} 
            onPageChange={handleChangePage} 
            onRowsPerPageChange={handleChangeRowsPerPage} 
            slotProps={{
                select: {
                    sx: {
                        '& .MuiSelect-icon': {
                        color: 'white', 
                        },
                    },
                },
            }}
            sx={{bgcolor: theme.palette.background.default, borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px'}}
        />
    );
}

export default  memo(AdminTablePagination);