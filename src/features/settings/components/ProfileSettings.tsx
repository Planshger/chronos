import { Button, Stack, TextField } from "@mui/material";
import theme from "../../../core/theme/darkTheme";

export default function ProfileSettings() {
    return (
		<Stack spacing={6} sx={{width: { xs: "100%", sm: "80%", md: "60%" }, mx: "auto", mt: { xs: 4, sm: 6, md: 8 }}}>
			<TextField label="Имя" defaultValue="Иван Иванов" fullWidth size="medium" sx={{'& fieldset': { borderColor: theme.palette.background.paper }}}/>
		
			<TextField label="Эл. почта" defaultValue="ivan@example.com" fullWidth size="medium" sx={{'& fieldset': { borderColor: theme.palette.background.paper }}}/>
		
			<Button variant="contained" fullWidth sx={{borderRadius: 3, color: theme.palette.text.primary}}>Сохранить изменения</Button>
		</Stack>
    );
}