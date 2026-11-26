import { Box, Container, Stack, Typography } from '@mui/material';
import { theme, appName } from '../../../../shared';
import { ClosingButton } from './LandingSection.style';
import { CheckCircle } from '@mui/icons-material';

interface LandingProposalSectionProps {
  continueOrRegistrationButton: () => void;
}

function LandingProposalSection({ continueOrRegistrationButton }: LandingProposalSectionProps) {
  return (
    <Box sx={{ py: 12, borderTop: `1px solid ${theme.custom.border.light}` }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Готовы взять время под контроль?
        </Typography>

        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
          Присоединяйтесь к тысячам пользователей, которые планируют умнее с {appName}.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 6, justifyContent: 'center', alignItems: 'center' }}>
          {['7 дней бесплатно', 'Отмена в любой момент'].map((text, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle sx={{ color: theme.custom.accent.green }} />
              <Typography variant="body2">{text}</Typography>
            </Box>
          ))}
        </Stack>

        <ClosingButton variant="contained" onClick={continueOrRegistrationButton}>
          Создать аккаунт
        </ClosingButton>
      </Container>
    </Box>
  );
}

export default LandingProposalSection;
