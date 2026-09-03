import { AccessTime, Chat, Person } from "@mui/icons-material";
import { AppBar, Avatar, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import theme from "../../../core/theme/darkTheme";
import { appName } from "../../../core/constants/name";
import { useState } from "react";
import ScheduleMenuUser from "./ScheduleMenuUser";

interface MainAppBarProps {
    isAiOpen: boolean;
    setIsAiOpen: Function;
    setActiveModal: Function;
}

export default function ScheduleAppBar({isAiOpen, setIsAiOpen, setActiveModal}: MainAppBarProps) {
    const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);

    function openUserMenu(event: React.MouseEvent<HTMLElement>) {setOpenMenu(event.currentTarget);};
    function closeUserMenu() {setOpenMenu(null)};

    return (
        <AppBar position="sticky" sx={{backdropFilter: 'blur(10px)'}}>
            <Toolbar sx={{justifyContent: 'space-between'}}>
                <Typography variant="h6"  sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                    <AccessTime sx={{fontSize: 38, color: theme.palette.primary.main}} />
                    {appName}
                </Typography>

                <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
                    <Button variant="outlined" startIcon={<Chat/>} onClick={() => setIsAiOpen(!isAiOpen)} sx={{color: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}15`,'&:hover': {borderColor: theme.palette.primary.main, bgcolor: `${theme.palette.primary.main}15`}}}>
                        ИИ-ассистент
                    </Button>

                    <IconButton onClick={openUserMenu} sx={{border: '2px solid transparent', '&:hover': {borderColor: theme.palette.primary.main}, p: 0.5}}>
                        <Avatar sx={{bgcolor: theme.palette.action.hover, width: 36, height: 36}}>
                            <Person sx={{color: theme.palette.text.primary}}/>
                        </Avatar>
                    </IconButton>

                    <ScheduleMenuUser openMenu={openMenu} closeUserMenu={closeUserMenu}/>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}