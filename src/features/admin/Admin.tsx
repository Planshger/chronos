import { Box, Input, Stack, Typography } from "@mui/material";
import theme from "../../core/theme/darkTheme";
import AdminAppBar from "./components/AdminAppBar";
import AdminTable from "./components/table/AdminTable";

export default function Admin() {
    return (
        <Box sx={{minHeight: '100vh', bgcolor: theme.palette.background.paper}}>
            <AdminAppBar/>

            <Stack sx={{display: 'flex', alignItems: 'left', px: 4, py: 4,}}>
                <Typography variant="h2" sx={{fontSize: '30px'}}>Пользователи</Typography>

                <Typography variant="h6" sx={{color: theme.palette.text.secondary, maxWidth: 672, fontSize: '15px'}}>
                    Управление пользователями, их статусами и тарифными планами.
                </Typography>
            </Stack>

            <AdminTable/>
        </Box>
    );
}