import { eachDayOfInterval, endOfMonth, endOfWeek, format, isSameMonth, startOfMonth, startOfWeek } from 'date-fns';
import { Box, Chip, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { CalendarToday, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { injectMobxStore } from '../../../shared';
import ScheduleStore from '../stores/ScheduleStore';
import { TaskType } from '../models/task_model';
import { ru } from 'date-fns/locale';
import {
  CalendarDay,
  CalendarHeader,
  CalendarRoot,
  CalendarTitleIconWrapper,
  DayNumber,
  DayTaskChip,
  DayTaskList,
  WeekdayLabel,
} from './style/Calendar.style';

interface CalendarProps {
  scheduleStore: ScheduleStore;
}

function Calendar({ scheduleStore }: CalendarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentMonth, selectedDate, tasks } = scheduleStore;
  const today = new Date();
  const todayKey = format(today, 'yyyy-MM-dd');
  const selectedDateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonthButton = () => {
    scheduleStore.nextMonth();
  };

  const prevMonthButton = () => {
    scheduleStore.prevMonth();
  };

  const sectedDateHandler = (date: Date) => {
    scheduleStore.selectDate(date, isMobile);
  };

  return (
    <CalendarRoot>
      <CalendarHeader direction="row">
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarTitleIconWrapper>
            <CalendarToday sx={{ fontSize: 20, color: '#fff' }} />
          </CalendarTitleIconWrapper>
          Расписание
        </Typography>

        <Stack direction="row" spacing={{ xs: 0, sm: 1 }} sx={{ alignItems: 'center' }}>
          <IconButton onClick={prevMonthButton} size="small">
            <ChevronLeft sx={{ color: theme.custom.accent.amber }} />
          </IconButton>

          <Typography variant="body1" sx={{ width: 120, textAlign: 'center', textTransform: 'capitalize' }}>
            {format(currentMonth, 'LLLL yyyy', { locale: ru })}
          </Typography>

          <IconButton onClick={nextMonthButton} size="small">
            <ChevronRight sx={{ color: theme.custom.accent.amber }} />
          </IconButton>
        </Stack>
      </CalendarHeader>

      <Stack spacing={{ xs: 1, sm: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
            <WeekdayLabel key={day} variant="caption">
              {day}
            </WeekdayLabel>
          ))}
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gap: { xs: 0.5, sm: 1 },
          }}
        >
          {days.map((date) => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const isToday = dateKey === todayKey;
            const isSelected = dateKey === selectedDateKey;
            const dayTasks = tasks[dateKey] || [];
            const isCurrentMonth = isSameMonth(date, monthStart);

            return (
              <CalendarDay
                key={dateKey}
                onClick={() => sectedDateHandler(date)}
                isSelected={isSelected}
                isCurrentMonth={isCurrentMonth}
              >
                <DayNumber variant="body1" isToday={isToday} isSelected={isSelected}>
                  {format(date, 'd')}
                </DayNumber>

                <DayTaskList>
                  {dayTasks.slice(0, 2).map((task) =>
                    isMobile ? (
                      <Chip
                        key={task.id}
                        size="small"
                        variant="outlined"
                        sx={{
                          bgcolor: task.type === TaskType.Meeting ? 'secondary.light' : 'primary.light',
                          height: 20,
                          width: 20,
                        }}
                      />
                    ) : (
                      <DayTaskChip
                        key={task.id}
                        label={task.title}
                        size="small"
                        variant="outlined"
                        isMeeting={task.type === TaskType.Meeting}
                      />
                    ),
                  )}
                  {dayTasks.length > 2 && (
                    <Typography variant="caption" color="text.secondary">
                      +{dayTasks.length - 2} ещё
                    </Typography>
                  )}
                </DayTaskList>
              </CalendarDay>
            );
          })}
        </Box>
      </Stack>
    </CalendarRoot>
  );
}

export default injectMobxStore('scheduleStore', Calendar);
