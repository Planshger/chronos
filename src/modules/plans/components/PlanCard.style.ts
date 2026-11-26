import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PlanCardStyleProps {
  isPopular: boolean;
  isActive: boolean;
  highlightInactive: boolean;
  outlinePopular: boolean;
}

export const PlanCardRoot = styled(Card, {
  shouldForwardProp: (prop) =>
    prop !== 'isPopular' && prop !== 'isActive' && prop !== 'highlightInactive' && prop !== 'outlinePopular',
})<PlanCardStyleProps>(({ theme, isPopular, isActive, highlightInactive, outlinePopular }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  minWidth: 0,
  backgroundColor: theme.palette.background.default,
  borderRadius: 16,
  border: isPopular
    ? `2px solid ${theme.palette.text.primary}`
    : highlightInactive && !isActive
      ? '2px solid red'
      : `1px solid ${theme.custom.border.light}`,
  boxShadow: theme.custom.shadows.sm,
  outline: outlinePopular && isPopular ? `1px solid ${theme.palette.text.primary}` : 'none',
}));

export const PlanCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  height: '100%',
});

export const PopularPlanBadge = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  textAlign: 'center',
  borderRadius: '20px',
  width: '130px',
}));

export const PopularPlanLabel = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  color: theme.palette.background.default,
  fontSize: '13px',
  marginTop: theme.spacing(0.5),
  marginBottom: theme.spacing(0.5),
}));

export const PlanFeaturesLayout = styled(Stack)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(4),
}));

interface PlanActionButtonStyleProps {
  isPopular: boolean;
}

export const PlanActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isPopular',
})<PlanActionButtonStyleProps>(({ theme, isPopular }) => ({
  borderRadius: '10px',
  backgroundColor: isPopular ? theme.palette.text.primary : theme.palette.background.paper,
  color: isPopular ? theme.palette.background.default : theme.palette.text.primary,
  fontSize: isPopular ? '16px' : '14px',
  boxShadow: 'none',
  border: `1px solid ${theme.custom.border.light}`,
  '&:hover': {
    boxShadow: '0 15px 25px -5px #a855f7',
  },
}));
