import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import theme from "../../core/theme/darkTheme";
import ListSettings from "./components/ListSettings";
import ProfileSettings from "./components/ProfileSettings";
import { useLocation, useNavigate } from "react-router-dom";
import ManagePlansSettings from "./components/ManagePlansSettings";
import SettingsData from "./data/SettingsData";
import AnalyticsSettings from "./components/AnalyticsSettings";

const settingsComponents: Record<string, React.ComponentType> = {
  'profile_settings': ProfileSettings,
  'manage_plans': ManagePlansSettings,
  'analytics': AnalyticsSettings,
//   'maps_settings': MapsSettings,
//   'messengers': MessengersSettings,
};

export default function Settings() {
    const location = useLocation();
	const navigate = useNavigate();

	const currentPath = location.pathname.split('/').pop() || 'profile_settings';
	const CurrentComponent = settingsComponents[currentPath] || ProfileSettings;

	const handleSelect = (id: string) => {navigate(`/settings/${id}`)};
    
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.paper }}>
            <Container maxWidth={false} sx={{py: { xs: 1, sm: 2, md: 3 }, px: { xs: 1, sm: 2, md: 3 }}}>
                <Stack spacing={4} direction={{xs: "column", sm: "column", md: "row" }} sx={{height: '94.5vh'}}>
                    <ListSettings onSelect={handleSelect}/>

                    <Paper sx={{p: 3, borderRadius: 7, width: '100%', minHeight: { xs: "70vh", md: "94.5vh" }, bgcolor: theme.palette.background.default, border: `1px solid ${theme.custom.border.light}`, boxShadow: theme.custom.shadows.sm}}>
                        <Stack direction="row" spacing={3} sx={{alignItems: "center", pt: { xs: 0, md: 1 },}}>
                            {SettingsData.map((item) => {
                                const messenger = item.messenger?.find((m) => m.id === currentPath);
                                const IconComponent = messenger?.icon || item.icon;

                                return (
                                    item.id === currentPath || messenger ? 
                                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: {xs: "1rem", sm: "1.25rem"}}}>
                                        <Box sx={{ p: 0.8, bgcolor: 'primary.main', borderRadius: 2, display: 'flex' }}>
                                            <IconComponent/>
                                        </Box>

                                        {messenger?.label || item.label}
                                    </Typography>: null
                                )
                            })}
                        </Stack>

                         <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pt: { xs: 4, sm: 8, md: 14 }, width: "100%"}}>
                            <CurrentComponent/>
                        </Box>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}