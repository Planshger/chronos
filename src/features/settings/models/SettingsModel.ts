import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface SettingsModel {
    id: string, 
    label: string,
    messenger?: SettingsModel[],
}
