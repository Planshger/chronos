import { Done } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Stack, Typography, useTheme } from '@mui/material';
import PlanModel from '../models/plan_model';

interface PlanCardProps {
  plan: PlanModel;
  actionLabel: string;
  onAction: () => void;
  highlightInactive?: boolean;
  outlinePopular?: boolean;
}

export default function PlanCard({
  plan,
  actionLabel,
  onAction,
  highlightInactive = false,
  outlinePopular = false,
}: PlanCardProps) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        minWidth: 0,
        bgcolor: theme.palette.background.default,
        borderRadius: 4,
        border: plan.popular
          ? `2px solid ${theme.palette.text.primary}`
          : highlightInactive && !plan.active
            ? '2px solid red'
            : `1px solid ${theme.custom.border.light}`,
        boxShadow: theme.custom.shadows.sm,
        outline:
          outlinePopular && plan.popular ? `1px solid ${theme.palette.text.primary}` : 'none',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
        {plan.popular && (
          <Box
            sx={{
              bgcolor: theme.palette.text.primary,
              textAlign: 'center',
              borderRadius: '20px',
              width: '130px',
            }}
          >
            <Typography
              variant="h2"
              sx={{
                textTransform: 'uppercase',
                color: theme.palette.background.default,
                fontSize: '13px',
                mb: 0.5,
                mt: 0.5,
              }}
            >
              Хит продаж
            </Typography>
          </Box>
        )}

        <Typography variant="h3" sx={{ pb: 1, pt: 2 }}>
          {plan.name}
        </Typography>

        <Typography variant="h2" sx={{ pb: 1 }}>
          {plan.price} {plan.trial ? '₽' : '₽ / мес'}
        </Typography>

        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          {plan.description}
        </Typography>

        <Stack
          direction="column"
          spacing={3}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            pt: 4,
          }}
        >
          <Stack direction="column" spacing={3}>
            {plan.features.map((feature) => (
              <Box key={feature} sx={{ display: 'flex', flexDirection: 'row' }}>
                <Done sx={{ width: 20, height: 20, color: 'grey' }} />
                <Typography variant="h3" sx={{ fontSize: '15px', ml: 1 }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Button
            variant="contained"
            onClick={onAction}
            sx={{
              borderRadius: '10px',
              bgcolor: plan.popular ? theme.palette.text.primary : theme.palette.background.paper,
              color: plan.popular ? theme.palette.background.default : theme.palette.text.primary,
              fontSize: plan.popular ? '16px' : '14px',
              boxShadow: 'none',
              border: `1px solid ${theme.custom.border.light}`,
              '&:hover': { boxShadow: '0 15px 25px -5px #a855f7' },
            }}
          >
            {actionLabel}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
