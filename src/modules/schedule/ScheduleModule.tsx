import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Box, Container, Dialog, Stack, useMediaQuery } from '@mui/material';
import { format, addMonths, subMonths } from 'date-fns';
import theme from '../../shared/ui/theme/darkTheme';
import Calendary from './components/Calendary';
import { initialTaskModel, Task, TaskItem, TaskModel } from './models/task_model';
import ScheduleAppBar from './components/ScheduleAppBar';
import Scheduling from './components/Scheduling';
import AiDialog from './components/AiDialog';
import OptionsDialog from './components/OptionsDialog';
import { useAuth } from '../auth/AuthProvider';
import Loader from '../../shared/ui/Loader';
import {
  getUserTasksByUserId,
  updateTasksData,
  addTask,
  editTask,
} from './datasources/task_data_source';
import { withLoading } from '../../shared/utils/withLoading';
import { useApiError } from '../../shared/errors/ApiErrorProvider';

interface LoadingContextProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

interface SheduleContextType {
  selectedDate: Date | null;
  activeModal: string | null;
  tasks: Task;
  setActiveModal: (name: string | null) => void;
  handleEditTask: (task: TaskItem) => void;
  handleSaveTask: (task: TaskItem) => void;
  onDeleteTasks: (ids: string[]) => void;
}

const ScheduleContext = createContext<SheduleContextType>({
  selectedDate: null,
  activeModal: null,
  setActiveModal: () => {},
  handleSaveTask: () => {},
  onDeleteTasks: () => {},
  handleEditTask: () => {},
  tasks: {},
});

const LoadingContext = createContext<LoadingContextProps>({ setLoading: () => {}, loading: false });

export function useLoading() {
  return useContext(LoadingContext);
}

export function useSchedule() {
  return useContext(ScheduleContext);
}

export default function Schedule() {
  const { user } = useAuth();
  const { showError } = useApiError();
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isSchedulingOpen, setIsSchedulingOpen] = useState(false);

  const [tasks, setTasks] = useState<TaskModel>(initialTaskModel);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSaveTask = useCallback(
    async (task: TaskItem) => {
      if (!user || !selectedDate || !activeModal) return;

      const dateKey = format(selectedDate, 'yyyy-MM-dd');

      try {
        await withLoading(
          () =>
            addTask(dateKey, { ...task, id: crypto.randomUUID() }, tasks, user.id).then((res) =>
              setTasks(res),
            ),
          setLoading,
        );
        setActiveModal('tasks_list');
      } catch (error) {
        showError(error);
      }
    },
    [user, selectedDate, activeModal, tasks, showError],
  );

  const handleEditTask = useCallback(
    async (task: TaskItem) => {
      if (!user || !selectedDate || !activeModal) return;

      const dateKey = format(selectedDate, 'yyyy-MM-dd');

      try {
        await withLoading(
          () => editTask(dateKey, { ...task }, tasks).then((res) => setTasks(res)),
          setLoading,
        );
        setActiveModal('tasks_list');
      } catch (error) {
        showError(error);
      }
    },
    [user, selectedDate, activeModal, tasks, showError],
  );

  const onDeleteTasks = useCallback(
    async (ids: string[]) => {
      if (!user || !selectedDate) return;

      const dateKey = format(selectedDate, 'yyyy-MM-dd');
      const dayTasks = tasks.tasks[dateKey].filter((t) => !ids.includes(t.id));

      try {
        await withLoading(
          () =>
            updateTasksData({ ...tasks, tasks: { ...tasks.tasks, [dateKey]: dayTasks } }).then(
              (res) => setTasks(res),
            ),
          setLoading,
        );
        setActiveModal(null);
      } catch (error) {
        showError(error);
      }
    },
    [user, selectedDate, tasks, showError],
  );

  const handleSelectDate = (date: Date | null) => {
    setSelectedDate(date);
    if (isMobile && date) setIsSchedulingOpen(true);
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const sheduleContextValue = useMemo(
    () => ({
      selectedDate,
      activeModal,
      setActiveModal,
      handleSaveTask,
      onDeleteTasks,
      handleEditTask,
      tasks: tasks.tasks ?? {},
    }),
    [
      selectedDate,
      activeModal,
      setActiveModal,
      handleSaveTask,
      onDeleteTasks,
      handleEditTask,
      tasks,
    ],
  );

  useEffect(() => {
    void withLoading(() => getUserTasksByUserId(user.id).then(setTasks), setLoading).catch(
      showError,
    );
  }, [user.id, showError]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.paper }}>
      <LoadingContext.Provider value={{ setLoading, loading }}>
        <ScheduleContext.Provider value={sheduleContextValue}>
          <ScheduleAppBar isAiOpen={isAiOpen} setIsAiOpen={setIsAiOpen} />

          <Container sx={{ py: 3, ml: 0, minWidth: '100%', mt: isMobile ? '30%' : 0 }}>
            <Stack spacing={4} direction={'row'}>
              <Calendary
                currentMonth={currentMonth}
                nextMonth={nextMonth}
                prevMonth={prevMonth}
                handleSelectDate={handleSelectDate}
              />
              {!isMobile && <Scheduling />}
            </Stack>
          </Container>

          {isMobile && (
            <Dialog
              open={isSchedulingOpen}
              onClose={() => setIsSchedulingOpen(false)}
              slotProps={{ paper: { sx: { borderRadius: 4 } } }}
            >
              <Scheduling />
            </Dialog>
          )}

          {isAiOpen && <AiDialog setIsAiOpen={setIsAiOpen} />}

          <OptionsDialog />
        </ScheduleContext.Provider>
      </LoadingContext.Provider>

      {loading && <Loader size={80} />}
    </Box>
  );
}
