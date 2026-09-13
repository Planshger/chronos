import { AppBar, Button, Stack, Toolbar, Typography } from "@mui/material";
import theme from "../../../core/theme/darkTheme";
import { CreditCard, GppGood, Settings } from "@mui/icons-material";

export default function AdminAppBar() {
    return (
        <AppBar position="sticky">
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Typography variant="h6"  sx={{display: 'flex', alignItems: 'center', gap: 1, fontSize: {xs: 0, lg: 20, md: 20}}}>
                    <GppGood sx={{fontSize: 38, color: theme.palette.primary.main}}/>
                    Админ панель
                </Typography>

                <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
                    <Button variant="outlined"  sx={{fontSize: {xs: 0, lg: 15, md: 15}, borderColor: theme.custom.border.light, color: theme.palette.text.primary, '&:hover': {backgroundColor: theme.custom.background.muted}}}>
                        <Settings sx={{mr: {lg: 1, xs: 0},}}/>
                        Профиль
                    </Button>

                    <Button variant="outlined" sx={{fontSize: {xs: 0, lg: 15, md: 15}, color: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}15`,'&:hover': {borderColor: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}15`}}}>
                        <CreditCard sx={{mr: {lg: 1, xs: 0},}}/>
                        Тарифы
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}