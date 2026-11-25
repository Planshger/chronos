import { Add, CalendarToday, DirectionsCar, Hotel, ListAlt, Restaurant } from '@mui/icons-material';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import injectMobxStore from '../../../shared/utils/injectMobxStore';
import { ScheduleModal } from '../stores/ScheduleStore';
import ScheduleStore from '../stores/ScheduleStore';
import { ru } from 'date-fns/locale';
import { format } from 'date-fns';
import { EmptySchedulePanel, ScheduleActionButton, ScheduleActionIcon, SelectedDayPanel } from './style/Scheduling.style';

interface SchedulingProps {
  scheduleStore: ScheduleStore;
}

function Scheduling({ scheduleStore }: SchedulingProps) {
  const theme = useTheme();
  const { selectedDate, tasks } = scheduleStore;
  const selectedDateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
  const selectedDayTasks = selectedDateKey ? (tasks[selectedDateKey] ?? []) : [];
  const hasTasks = selectedDayTasks.length > 0;

  return (
    <Box sx={{ width: { xs: '100%', md: 'min(320px, 30%)' }, minWidth: 0, flexShrink: 0 }}>
      {selectedDate ? (
        <SelectedDayPanel>
          <Typography variant="h6" sx={{ mb: 2, textTransform: 'capitalize' }}>
            {format(selectedDate, 'd MMMM', { locale: ru })}
          </Typography>

          <Stack spacing={3}>
            {[
              {
                icon: hasTasks ? ListAlt : Add,
                label: hasTasks ? `Задачи (${selectedDayTasks.length})` : 'Добавить задачу',
                id: hasTasks ? ScheduleModal.TasksList : ScheduleModal.TaskCreate,
                color: theme.custom.accent.blue,
                bg: `${theme.custom.accent.blue}15`,
              },
              {
                icon: DirectionsCar,
                label: 'Заказать такси',
                id: ScheduleModal.Taxi,
                color: theme.custom.accent.amber,
                bg: `${theme.custom.accent.amber}15`,
              },
              {
                icon: Hotel,
                label: 'Бронь отеля',
                id: ScheduleModal.Hotel,
                color: theme.custom.accent.green,
                bg: `${theme.custom.accent.green}15`,
              },
              {
                icon: Restaurant,
                label: 'Резерв столика',
                id: ScheduleModal.Restaurant,
                color: theme.custom.accent.pink,
                bg: `${theme.custom.accent.pink}15`,
              },
            ].map((action) => (
              <ScheduleActionButton
                key={action.id}
                variant="outlined"
                fullWidth
                onClick={() => scheduleStore.setActiveModal(action.id)}
              >
                <Stack spacing={1.7} direction="row" sx={{ alignItems: 'center', minWidth: 0 }}>
                  <ScheduleActionIcon accent={action.color} iconBackground={action.bg}>
                    {<action.icon sx={{ width: 21, height: 21 }} />}
                  </ScheduleActionIcon>

                  <Typography sx={{ textAlign: 'left' }}>{action.label}</Typography>
                </Stack>
              </ScheduleActionButton>
            ))}
          </Stack>
        </SelectedDayPanel>
      ) : (
        <EmptySchedulePanel variant="outlined">
          <CalendarToday sx={{ fontSize: 40, opacity: 0.2, mb: 2 }} />

          <Typography variant="body2">Выберите день в календаре для планирования.</Typography>
        </EmptySchedulePanel>
      )}
    </Box>
  );
}

export default injectMobxStore('scheduleStore', Scheduling);
