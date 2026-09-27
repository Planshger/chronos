import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import theme from "../../../core/theme/darkTheme";
import { CreditCard, GppGood, Logout, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../providers/AuthProvider";

export default function AdminAppBar() {
    const navigate = useNavigate();
    const {logout} = useAuth();

    return (
        <AppBar position="sticky">
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Typography variant="h6"  sx={{display: 'flex', alignItems: 'center', gap: 1, fontSize: {xs: 0, lg: 20, md: 20}}}>
                    <GppGood sx={{fontSize: 38, color: theme.palette.primary.main}}/>
                    Админ панель
                </Typography>

                <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
                    <Button variant="outlined"  onClick={() => navigate(`/settings/admin_profile_settings`)} sx={{fontSize: {xs: 0, lg: 15, md: 15}, borderColor: theme.custom.border.light, color: theme.palette.text.primary, '&:hover': {backgroundColor: theme.custom.background.muted}}}>
                        <Settings sx={{mr: {lg: 1, xs: 0},}}/>
                        Профиль
                    </Button>

                    <Button variant="outlined" onClick={() => navigate(`/settings/admin_manage_plans`)} sx={{fontSize: {xs: 0, lg: 15, md: 15}, color: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}15`,'&:hover': {borderColor: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}15`}}}>
                        <CreditCard sx={{mr: {lg: 1, xs: 0},}}/>
                        Тарифы
                    </Button>
                    <Button variant="outlined" onClick={() => logout()} sx={{fontSize: {xs: 0, lg: 15, md: 15}, color: 'error.main', bgcolor: `${theme.palette.primary.main}15`,'&:hover': {borderColor: 'error.main', bgcolor: `${theme.palette.primary.main}15`}}}>
                        <Logout sx={{mr: {lg: 1, xs: 0},}}/>
                        Выход 
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}