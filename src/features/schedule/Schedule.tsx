import { useState } from 'react';
import { Box, Container, Stack} from '@mui/material';
import { format, addMonths, subMonths} from 'date-fns';
import theme from '../../core/theme/darkTheme';
import Calendary from './components/Calendary';
import { TaskModel } from './models/TaskModel';
import ScheduleAppBar from './components/ScheduleAppBar';
import Scheduling from './components/Scheduling';
import AiDialog from './components/AiDialog';
import OptionsDialog from './components/OptionsDialog';

export default  function Schedule() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [tasks, setTasks] = useState<TaskModel>({});
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskType, setNewTaskType] = useState('задача');

  const handleSaveTask = () => {
    if (!selectedDate || !newTaskTitle || !activeModal) return;
    
    const dateKey = format(selectedDate, 'yyyy-MM-dd');

    setTasks((prev) => ({
      ...prev,
      [dateKey]: [ ...prev[dateKey] || [], { id: Date.now().toString(), title: newTaskTitle, description: newTaskDescription, type: newTaskType }],
    }));

    setActiveModal('tasks_list');
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskType('задача');
  };

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  return (
    <Box sx={{minHeight: '100vh', bgcolor: theme.palette.background.paper}}>
      <ScheduleAppBar isAiOpen={isAiOpen} setIsAiOpen={setIsAiOpen} setActiveModal={setActiveModal}/>

      <Container sx={{py: 3, ml: 0, minWidth: '100%'}}>
        <Stack spacing={4} direction={'row'}>
          <Calendary currentMonth={currentMonth} nextMonth={nextMonth} prevMonth={prevMonth} selectedDate={selectedDate} tasks={tasks} setSelectedDate={setSelectedDate}/>
          <Scheduling selectedDate={selectedDate} tasks={tasks} setActiveModal={setActiveModal}/>          
        </Stack>
      </Container>

      {isAiOpen && (
        <AiDialog setIsAiOpen={setIsAiOpen} />
      )}

      <OptionsDialog activeModal={activeModal} setActiveModal={setActiveModal} selectedDate={selectedDate} tasks={tasks} newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle} newTaskDescription={newTaskDescription} setNewTaskDescription={setNewTaskDescription} newTaskType={newTaskType} setNewTaskType={setNewTaskType} handleSaveTask={handleSaveTask}/>
    </Box>
  );
};