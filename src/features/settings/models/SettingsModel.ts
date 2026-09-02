import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface SettingsModel {
    id: string, 
    icon: React.ComponentType<SvgIconTypeMap<{}, "svg">> & OverridableComponent<SvgIconTypeMap<{}, "svg">>,
    label: string,
    messenger?: SettingsModel[],
}
