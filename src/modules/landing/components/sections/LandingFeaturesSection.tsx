import { Box, CardContent, Container, Grid, Typography } from '@mui/material';
import { theme, appName } from '../../../../shared';
import { FeatureCard, FeatureIconWrapper } from './LandingSection.style';
import { CalendarToday, Chat, LocationOn } from '@mui/icons-material';

const features = [
  {
    icon: <CalendarToday />,
    title: 'Умный календарь',
    desc: 'Организуйте дни с интуитивным и красивым календарем. Добавляйте задачи в один клик.',
    accent: '#6366f1',
  },
  {
    icon: <Chat />,
    title: 'ИИ-ассистент',
    desc: 'Ваш личный ИИ всегда готов помочь проанализировать расписание или найти лучшее время для встречи.',
    accent: '#a855f7',
  },
  {
    icon: <LocationOn />,
    title: 'Мгновенное бронирование',
    desc: 'Нужна машина или столик? Заказывайте такси, отели и рестораны прямо из событий календаря.',
    accent: '#f472b6',
  },
];

function LandingFeaturesSection() {
  return (
    <Box
      sx={{
        py: 12,
        bgcolor: theme.custom.background.muted,
        borderTop: `1px solid ${theme.custom.border.light}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Всё необходимое в одном месте
          </Typography>

          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, maxWidth: 672, mx: 'auto' }}>
            Хватит переключаться между приложениями. {appName} интегрирует важнейшие аспекты планирования вашего дня.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((f) => (
            <Grid key={f.title} size={{ xs: 12, sm: 6, md: 4 }}>
              <FeatureCard>
                <CardContent sx={{ p: 4 }}>
                  <FeatureIconWrapper className="icon-wrapper" accent={f.accent}>
                    {f.icon}
                  </FeatureIconWrapper>

                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {f.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    {f.desc}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default LandingFeaturesSection;
