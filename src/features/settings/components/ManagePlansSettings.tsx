import { AutoAwesome } from "@mui/icons-material";
import { Avatar, Button, Grid, Stack, Typography } from "@mui/material";
import theme from "../../../core/theme/darkTheme";

export default function ManagePlansSettings() {
    return (
        <Stack spacing={3} sx={{alignItems: "center"}}>
            <Avatar sx={{width: 64, height: 64, bgcolor: 'warning.main', background: 'linear-gradient(135deg, #f59e0b, #f97316)'}}>
                <AutoAwesome fontSize="large" sx={{color: '#fff'}}/>
            </Avatar>

            <Typography variant="h5">Премиум</Typography>

            <Typography variant="body2" color="text.secondary">Активен до 12 октября 2026 г.</Typography>

            <Grid container spacing={2}>
                <Button variant="outlined" fullWidth sx={{borderRadius: 3, color: theme.palette.text.primary}}>Продлить подписку</Button>

                <Button variant="outlined" fullWidth sx={{borderRadius: 3, color: theme.palette.text.primary}}>Сменить тарифный план</Button>

                <Button variant="outlined" color="error" fullWidth sx={{borderRadius: 3}}>Отменить подписку</Button>
            </Grid>
        </Stack>
    );
}