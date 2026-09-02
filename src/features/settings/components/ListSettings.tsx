import {Collapse, List, ListItemButton, ListItemIcon, ListItemText, SvgIcon} from "@mui/material";
import theme from "../../../core/theme/darkTheme";
import SettingsData from "../data/SettingsData";
import { ArrowBack, ExpandLess, ExpandMore, Message } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { SettingsModel } from "../models/SettingsModel";
import { useState } from "react";
import TelegramIcon from "./TelegramIcon";
import WhatsAppIcon from "./WhatsAppIcon";

interface ListSettingsProps {
  onSelect: (id: string) => void;
}

export default function ListSettings({onSelect}: ListSettingsProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleSelect(id: string) {
    if (id === 'messengers') {
      setOpen(!open);
    } else {
      onSelect(id)
    }
  }

  return (
    <List sx={{width: {xs: "100%", md: 340}, display: {xs: 'flex', lg: 'block'}, flexDirection: {xs: 'row', md: 'column', lg: 'column'}}} component="nav">
      <ListItemButton onClick={() => navigate('/schedule')} sx={{'&:hover': {transform: 'translateY(-4px)', background: theme.palette.background.paper}}}>
          <ListItemIcon>
            <ArrowBack sx={{color: theme.palette.text.primary}}/>
          </ListItemIcon>

          <ListItemText primary='Назад' sx={{display: {xs: "none", md: "block"}}}/>
      </ListItemButton>

      {SettingsData.map((item: SettingsModel) => (
          <ListItemButton onClick={() => handleSelect(item.id)} sx={{'&:hover': {transform: 'translateY(-4px)', background: theme.palette.background.paper}}}>
            <ListItemIcon>
              <item.icon sx={{color: theme.palette.text.primary}}/>
            </ListItemIcon>

            <ListItemText primary={item.label} sx={{display: {xs: "none", md: "block"}}}/>
            {item.id === 'messengers' ? open ? <ExpandLess /> : <ExpandMore /> : null}
          </ListItemButton> 
        ))}
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {SettingsData.find((i) => i.id === 'messengers')?.messenger?.map((messenger) => (
                <ListItemButton onClick={() => onSelect(messenger.id)} sx={{ pl: 4, '&:hover': {transform: 'translateY(-4px)', background: theme.palette.background.paper}}}>
                  <ListItemIcon>
                    <messenger.icon/>
                  </ListItemIcon>

                  <ListItemText primary={messenger.label} sx={{display: {xs: "none", md: "block"}}}/>
                </ListItemButton>
              ))}
            </List>
          </Collapse>
    </List>
  );
}
