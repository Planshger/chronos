import { Typography } from '@mui/material';
import { LandingFooter } from './LandingSection.style';
import { appName } from '../../../../shared/constants/name';
import theme from '../../../../shared/ui/theme/darkTheme';

function LandingFooterSection() {
  return (
    <LandingFooter>
      <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 1 }}>
        {appName}
      </Typography>
      <Typography variant="caption">© 2026 {appName} Inc. Все права защищены.</Typography>
    </LandingFooter>
  );
}

export default LandingFooterSection;
