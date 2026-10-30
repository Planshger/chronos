import { Add, CalendarToday, DirectionsCar, Hotel, ListAlt, Restaurant } from '@mui/icons-material';
import { Box, Button, Paper, Stack, Typography, useTheme } from '@mui/material';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';

import { useSchedule } from '../ScheduleModule';

export default function Scheduling() {
  const { selectedDate, setActiveModal, tasks } = useSchedule();
  const theme = useTheme();

  return (
    <Box sx={{ width: { xs: '100%', md: 'min(320px, 30%)' }, minWidth: 0, flexShrink: 0 }}>
      {selectedDate ? (
        <Paper
          sx={{
            position: 'sticky',
            top: 80,
            p: 3,
            borderRadius: 4,
            border: `1px solid ${theme.custom.border.light}`,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
            {format(selectedDate, 'd MMMM', { locale: ru })}
          </Typography>

          <Stack spacing={3}>
            {[
              {
                icon: (tasks[format(selectedDate, 'yyyy-MM-dd')]?.length || 0) > 0 ? ListAlt : Add,
                label:
                  (tasks[format(selectedDate, 'yyyy-MM-dd')]?.length || 0) > 0
                    ? `Задачи (${tasks[format(selectedDate, 'yyyy-MM-dd')].length})`
                    : 'Добавить задачу',
                id:
                  (tasks[format(selectedDate, 'yyyy-MM-dd')]?.length || 0) > 0
                    ? 'tasks_list'
                    : 'task_create',
                color: theme.custom.accent.blue,
                bg: `${theme.custom.accent.blue}15`,
              },
              {
                icon: DirectionsCar,
                label: 'Заказать такси',
                id: 'taxi',
                color: theme.custom.accent.amber,
                bg: `${theme.custom.accent.amber}15`,
              },
              {
                icon: Hotel,
                label: 'Бронь отеля',
                id: 'hotel',
                color: theme.custom.accent.green,
                bg: `${theme.custom.accent.green}15`,
              },
              {
                icon: Restaurant,
                label: 'Резерв столика',
                id: 'restaurant',
                color: theme.custom.accent.pink,
                bg: `${theme.custom.accent.pink}15`,
              },
            ].map((action) => (
              <Button
                key={action.id}
                variant="outlined"
                fullWidth
                onClick={() => setActiveModal(action.id)}
                sx={{
                  justifyContent: 'flex-start',
                  borderRadius: 3,
                  borderColor: theme.custom.border.light,
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  py: 1.5,
                  '&:hover': { bgcolor: theme.palette.action.hover },
                }}
              >
                <Stack spacing={1.7} direction="row" sx={{ alignItems: 'center', minWidth: 0 }}>
                  <Box
                    sx={{
                      width: 35,
                      height: 35,
                      borderRadius: 2,
                      bgcolor: action.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: action.color,
                    }}
                  >
                    {<action.icon sx={{ width: 21, height: 21 }} />}
                  </Box>

                  <Typography sx={{ textAlign: 'left' }}>{action.label}</Typography>
                </Stack>
              </Button>
            ))}
          </Stack>
        </Paper>
      ) : (
        <Paper
          variant="outlined"
          sx={{
            position: 'sticky',
            top: 80,
            p: 4,
            borderRadius: 4,
            borderStyle: 'dashed',
            borderColor: theme.custom.border.medium,
            textAlign: 'center',
            color: theme.palette.text.secondary,
            bgcolor: 'transparent',
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CalendarToday sx={{ fontSize: 40, opacity: 0.2, mb: 2 }} />

          <Typography variant="body2">Выберите день в календаре для планирования.</Typography>
        </Paper>
      )}
    </Box>
  );
}
