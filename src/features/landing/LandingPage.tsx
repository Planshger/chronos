import { Box, Container, Typography, Button, Grid, Card, CardContent, Stack } from '@mui/material';
import { CalendarToday, Chat, LocationOn, CheckCircle, FlashOn } from '@mui/icons-material';
import theme from '../../core/theme/darkTheme';
import { appName } from '../../core/constants/name';
import LandingAppBar from './components/LandingAppBar';

const features = [
  {icon: <CalendarToday />,title: 'Умный календарь',desc: 'Организуйте дни с интуитивным и красивым календарем. Добавляйте задачи в один клик.',color: theme.palette.primary.main,bg: `${theme.palette.primary.main}15`},
  {icon: <Chat />,title: 'ИИ-ассистент',desc: 'Ваш личный ИИ всегда готов помочь проанализировать расписание или найти лучшее время для встречи.',color: theme.palette.secondary.main,bg: `${theme.palette.secondary.main}15`},
  {icon: <LocationOn />,title: 'Мгновенное бронирование',desc: 'Нужна машина или столик? Заказывайте такси, отели и рестораны прямо из событий календаря.',color: theme.custom.accent.pink,bg: `${theme.custom.accent.pink}15`},
];

export default function LandingPage() {
  return (
    <Box sx={{minHeight: '100vh', bgcolor: theme.palette.background.default}}>
      <LandingAppBar />

      <Box sx={{pt: 16, pb: 14}}>
        <Box sx={{position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 768, height: 500, opacity: 0.5, pointerEvents: 'none'}}>
          <div style={{position: 'absolute', inset: 0, background: theme.custom.gradients.hero, filter: 'blur(90px)', borderRadius: '50%'}} />
        </Box>

        <Container maxWidth="lg" sx={{position: 'relative', zIndex: 1, textAlign: 'center'}}>
          <Box sx={{display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: 20, bgcolor: theme.custom.background.glass, border: `2px solid ${theme.custom.border.light}`, fontSize: '15px', color: theme.palette.text.primary, mb: 4}}>
            <FlashOn sx={{fontSize: 20, color: theme.custom.accent.amber}} />
            <span>Новый стандарт личной продуктивности</span>
          </Box>

          <Typography variant="h3" sx={{fontSize: '4.5rem', lineHeight: 1.2, mb: 3}}>
            Управляйте временем с{' '}
            <span style={{background: theme.custom.gradients.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              ИИ-ассистентом.
            </span>
          </Typography>

          <Typography variant="h6" sx={{color: theme.palette.text.secondary, maxWidth: 672, mx: 'auto', mb: 5, fontSize: '1.25rem'}}>
            Единое пространство, объединяющее ваш календарь, задачи, ИИ-ассистента и бронирование сервисов в одном интерфейсе.
          </Typography>

          <Stack direction="row" spacing={2} sx={{mb: 4, justifyContent: 'center'}}>
            <Button variant="contained" sx={{px: 5, py: 1.8, borderRadius: 30, color: theme.palette.text.primary}}>
              Начать бесплатно
            </Button>

            <Button variant="outlined" sx={{px: 5, py: 1.8, borderRadius: 30, borderColor: theme.custom.border.light, color: theme.palette.text.primary, '&:hover': {backgroundColor: theme.custom.background.muted}}}>
              Тарифы
            </Button>
          </Stack>
        </Container>
      </Box>


      <Box sx={{py: 12, bgcolor: theme.custom.background.muted, borderTop: `1px solid ${theme.custom.border.light}`}}>
        <Container maxWidth="lg">
          <Box sx={{textAlign: 'center', mb: 8}}>
            <Typography variant="h3" sx={{mb: 2}}>
              Всё необходимое в одном месте
            </Typography>

            <Typography variant="body1" sx={{color: theme.palette.text.secondary, maxWidth: 672, mx: 'auto'}}>
              Хватит переключаться между приложениями. {appName} интегрирует важнейшие аспекты планирования вашего дня.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((f) => (
              <Card key={f.title} sx={{height: '100%', borderRadius: 4, border: `1px solid ${theme.custom.border.light}`, boxShadow: theme.custom.shadows.sm, '&:hover': { boxShadow: theme.custom.shadows.md, transform: 'translateY(-4px)', '& .icon-wrapper': { transform: 'scale(1.1)'}}}}>
                <CardContent sx={{p: 4}}>
                  <Box className="icon-wrapper" sx={{width: 56, height: 56, borderRadius: 2, bgcolor: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, transition: 'transform 0.2s', color: f.color}}>
                    {f.icon}
                  </Box>

                  <Typography variant="h5" sx={{mb: 1}}>{f.title}</Typography>

                  <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>{f.desc}</Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Container>
      </Box>


      <Box sx={{py: 12, borderTop: `1px solid ${theme.custom.border.light}`}}>
        <Container maxWidth="md" sx={{textAlign: 'center' }}>
          <Typography variant="h3" sx={{mb: 2}}>Готовы взять время под контроль?</Typography>

          <Typography variant="h6" sx={{color: theme.palette.text.secondary, mb: 4}}>Присоединяйтесь к тысячам пользователей, которые планируют умнее с {appName}.</Typography>

          <Stack direction="row" spacing={3} sx={{ mb: 6, justifyContent: 'center'}}>
            {['7 дней бесплатно', 'Отмена в любой момент'].map((text, i) => (
              <Box key={i} sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <CheckCircle sx={{color: theme.custom.accent.green}} />
                <Typography variant="body2">{text}</Typography>
              </Box>
            ))}
          </Stack>

          <Button variant="contained" sx={{px: 6, py: 1.8, borderRadius: 30, bgcolor: theme.palette.text.primary, boxShadow: theme.custom.shadows.lg, '&:hover': {boxShadow: '0 20px 25px -5px #a855f7'}}}>
            Создать аккаунт
          </Button>
        </Container>
      </Box>

      <Box component="footer" sx={{borderTop: `1px solid ${theme.custom.border.light}`, py: 4, textAlign: 'center', color: theme.palette.text.secondary}}>
        <Typography variant="body2" sx={{color: theme.palette.text.primary, mb: 1}}>{appName}</Typography>
        <Typography variant="caption">© 2026 {appName} Inc. Все права защищены.</Typography>
      </Box>
    </Box>
  );
}