import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import theme from "../../core/theme/darkTheme";
import ListSettings from "./components/ListSettings";
import ProfileSettings from "./components/ProfileSettings";
import { useLocation, useNavigate } from "react-router-dom";
import ManagePlansSettings from "./components/ManagePlansSettings";
import AnalyticsSettings from "./components/AnalyticsSettings";
import WhatsAppSettings from "./components/WhatsAppSettings";
import TelegramSettings from "./components/TelegramSettings";
import { SettingsModel } from "./models/SettingsModel";
import { SettingIcons } from "../../core/constants/SettingIcons";
import { TouchApp } from "@mui/icons-material";
import React, { createContext, useContext, useState } from "react";
import { AdminSettingsData, SettingsData } from "./data/SettingsData";
import { useAuth } from "../../providers/AuthProvider";
import Loader from "../../core/components/Loader";

const settingsComponents: Record<string, React.ComponentType> = {
    'profile_settings': ProfileSettings,
    'manage_plans': ManagePlansSettings,
    'analytics': AnalyticsSettings,
    'telegram': TelegramSettings,
    'whatsapp': WhatsAppSettings,
    'admin_profile_settings': ProfileSettings,
    'admin_manage_plans': ManagePlansSettings,
};

interface LoadingContextProps {
    setLoading: (value: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps>({setLoading: () => {}})

export function useLoading() {
    return useContext(LoadingContext);
}

export default function Settings() {
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const {role} = useAuth();
	const navigate = useNavigate();
	const currentPath = location.pathname.split('/').pop() || 'profile_settings';
    let settingsData: SettingsModel[] = role === 'admin'? AdminSettingsData : SettingsData;

    const CurrentComponent = settingsComponents[currentPath] || ProfileSettings;
    
	const handleSelect = (id: string) => {navigate(`/settings/${id}`)};
    
    return (
        <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.paper }}>
            <LoadingContext.Provider value={{setLoading}}>
                <Container maxWidth={false} sx={{py: { xs: 1, sm: 2, md: 3 }, px: { xs: 1, sm: 2, md: 3 }}}>
                    <Stack spacing={4} direction={{xs: "column", sm: "column", md: "row" }} sx={{height: '94.5vh'}}>
                        <ListSettings onSelect={handleSelect} settingsData={settingsData}/>

                        <Paper sx={{p: 3, borderRadius: 7, width: '100%', minHeight: { xs: "70vh", md: "94.5vh" }, bgcolor: theme.palette.background.default, border: `1px solid ${theme.custom.border.light}`, boxShadow: theme.custom.shadows.sm}}>
                            <Stack direction="row" spacing={3} sx={{alignItems: "center", pt: { xs: 0, md: 1 },}}>
                                {settingsData.map((item) => {
                                    const messenger = item.messenger?.find((m) => m.id === currentPath);
                                    const IconComponent = SettingIcons.get(item.id) ?? TouchApp;;
                                
                                    return (
                                        item.id === currentPath || messenger ? 
                                        <Typography key={item.id} variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: {xs: "1rem", sm: "1.25rem"}}}>
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
            </LoadingContext.Provider>
            {loading && (
                <Loader size={80} />
            )}
        </Box>
    );
}