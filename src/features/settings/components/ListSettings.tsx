import {Collapse, List, ListItemButton, ListItemIcon, ListItemText, SvgIcon, SvgIconProps} from "@mui/material";
import theme from "../../../core/theme/darkTheme";
import { ArrowBack, ExpandLess, ExpandMore, Message, Settings, SvgIconComponent, TouchApp } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { SettingsModel } from "../models/SettingsModel";
import { useEffect, useState } from "react";
import { SettingIcons } from "../../../core/constants/SettingIcons";

interface ListSettingsProps {
  onSelect: (id: string) => void;
  settingsData: SettingsModel[];
}

export default function ListSettings({onSelect, settingsData}: ListSettingsProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const backPath = location.pathname.startsWith('/settings/admin_') ? '/admin' : '/schedule';
  const [open, setOpen] = useState(false);

  function handleSelect(id: string) {
    if (id === 'messengers') {
      setOpen(!open);
    } else {
      onSelect(id)
    }
  }

  useEffect(() => {setOpen(location.state?.open)}, []);

  return (
    <List sx={{width: {xs: "100%", md: 340, sm: 200}, display: {xs: 'flex', md: 'block', lg: 'block'}, flexDirection: {xs: 'row', md: 'column', lg: 'column'}}} component="nav">
      <ListItemButton key="back" onClick={() => navigate(backPath)} sx={{'&:hover': {transform: 'translateY(-4px)', background: theme.palette.background.paper}}}>
        <ListItemIcon>
          <ArrowBack sx={{color: theme.palette.text.primary}}/>
        </ListItemIcon>

        <ListItemText primary='Назад' sx={{display: {xs: "none", md: "block"}}}/>
      </ListItemButton>

      {settingsData.map((item: SettingsModel) => {
        const Icon = SettingIcons.get(item.id) ?? TouchApp;
        return <ListItemButton key={item.id} onClick={() => handleSelect(item.id)} sx={{'&:hover': {transform: 'translateY(-4px)', background: theme.palette.background.paper}}}>
          <ListItemIcon>
            <Icon sx={{color: theme.palette.text.primary}}/>
          </ListItemIcon>

          <ListItemText primary={item.label} sx={{display: {xs: "none", md: "block"}}}/>

          {item.id === 'messengers' ? open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButton> 
      })}

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {settingsData.find((i) => i.id === 'messengers')?.messenger?.map((messenger) => {
            const Icon = SettingIcons.get(messenger.id) ?? TouchApp;

            return <ListItemButton key={messenger.id} onClick={() => onSelect(messenger.id)} sx={{ pl: 4, '&:hover': {transform: 'translateY(-4px)', background: theme.palette.background.paper}}}>
                      <ListItemIcon>
                        <Icon/>
                      </ListItemIcon>

                      <ListItemText primary={messenger.label} sx={{display: {xs: "none", md: "block"}}}/>
                    </ListItemButton>
          })}
        </List>
      </Collapse>
    </List>
  );
}
