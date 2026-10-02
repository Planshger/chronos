import { Logout, TouchApp } from "@mui/icons-material";
import { Box, Chip, Divider, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import theme from "../../../core/theme/darkTheme";
import { useNavigate } from "react-router-dom";
import { SettingsData } from "../../settings/data/SettingsData";
import { SettingIcons } from "../../../core/constants/SettingIcons";
import { useAuth } from "../../../providers/AuthProvider";


interface ScheduleMenuUserProps {
    openMenu: null | HTMLElement;
    closeUserMenu: Function;
}

export default function ScheduleMenuUser({openMenu, closeUserMenu}: ScheduleMenuUserProps) {
    const {user} = useAuth();
    const navigate = useNavigate();
    const {logout} = useAuth();

    function onClick(id: string) {
        if (id === 'telegram' || id === 'whatsapp') {
            navigate(`/settings/${id}`, {state: {open: true}});
        } else {
            navigate(`/settings/${id}`);
        }
    }
    
    return (
        <Menu id="menu-appbar" anchorEl={openMenu} open={Boolean(openMenu)} onClose={() => closeUserMenu()} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Box sx={{px: 2, py: 1.5, borderBottom: `1px solid ${theme.custom.border.light}`}}>
                <Typography variant="body2">{user?.name}</Typography>

                <Chip label={`${user?.plan} тариф`} size="small" color="primary" sx={{mt: 0.5}}/>
            </Box>

            {SettingsData.map((item) => {
                const Icon = SettingIcons.get(item.id) ?? TouchApp;
                return <MenuItem key={item.id} sx={{py: 1}} onClick={() => { onClick(item.id === 'messengers' ? 'telegram' : item.id); closeUserMenu();}}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <Icon fontSize="small" sx={{color: theme.palette.text.primary}}/>
                            </ListItemIcon>

                            <ListItemText primary={item.label}/>
                        </MenuItem>
            })}

            <Divider/>

            <MenuItem sx={{ color: 'error.main' }} onClick={async () => {await logout(); navigate('/')}}>
                <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}>
                    <Logout fontSize="small"/>
                </ListItemIcon>
                
                <ListItemText primary="Выход из аккаунта"/>
            </MenuItem>
        </Menu>
    );
}