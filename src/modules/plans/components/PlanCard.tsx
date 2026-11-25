import { Box, Stack, Typography, useTheme } from '@mui/material';
import PlanModel from '../models/plan_model';
import { Done } from '@mui/icons-material';
import {
  PlanActionButton,
  PlanCardContent,
  PlanCardRoot,
  PlanFeaturesLayout,
  PopularPlanBadge,
  PopularPlanLabel,
} from './PlanCard.style';

interface PlanCardProps {
  plan: PlanModel;
  actionLabel: string;
  onAction: () => void;
  highlightInactive?: boolean;
  outlinePopular?: boolean;
}

export default function PlanCard({ plan, actionLabel, onAction, highlightInactive = false, outlinePopular = false }: PlanCardProps) {
  const theme = useTheme();

  return (
    <PlanCardRoot
      isPopular={plan.popular}
      isActive={plan.active}
      highlightInactive={highlightInactive}
      outlinePopular={outlinePopular}
    >
      <PlanCardContent>
        {plan.popular && (
          <PopularPlanBadge>
            <PopularPlanLabel variant="h2">Хит продаж</PopularPlanLabel>
          </PopularPlanBadge>
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

        <PlanFeaturesLayout direction="column" spacing={3}>
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

          <PlanActionButton variant="contained" onClick={onAction} isPopular={plan.popular}>
            {actionLabel}
          </PlanActionButton>
        </PlanFeaturesLayout>
      </PlanCardContent>
    </PlanCardRoot>
  );
}
