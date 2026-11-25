import injectMobxStore from '../../../../shared/utils/injectMobxStore';
import { Button, Stack, TextField, useTheme } from '@mui/material';
import { TaskItem, TaskType } from '../../models/task_model';
import ScheduleStore from '../../stores/ScheduleStore';
import { useState } from 'react';

interface TaskEditDialogContentProps {
  task: TaskItem;
  scheduleStore: ScheduleStore;
}

function TaskEditDialogContent({ task, scheduleStore }: TaskEditDialogContentProps) {
  const theme = useTheme();
  const [newTask, setNewTask] = useState<TaskItem>(task);

  const setTypeTask = (type: TaskType) => {
    setNewTask((prev) => ({ ...prev, type: type }));
  };

  const setTitleTask = (title: string) => {
    setNewTask((prev) => ({ ...prev, title: title }));
  };

  const setDescriptionTask = (description: string) => {
    setNewTask((prev) => ({ ...prev, description: description }));
  };

  const saveTask = () => {
    scheduleStore.handleEditTask(newTask);
  };

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={1} sx={{ bgcolor: theme.palette.action.hover, p: 0.5, borderRadius: 3 }}>
        <Button
          fullWidth
          variant={newTask.type === TaskType.Task ? 'contained' : 'text'}
          onClick={() => setTypeTask(TaskType.Task)}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Задача
        </Button>

        <Button
          fullWidth
          variant={newTask.type === TaskType.Meeting ? 'contained' : 'text'}
          onClick={() => setTypeTask(TaskType.Meeting)}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Встреча
        </Button>
      </Stack>

      <TextField
        label={newTask.type === TaskType.Task ? 'Название задачи' : 'Тема встречи'}
        value={newTask.title}
        onChange={(e) => setTitleTask(e.target.value)}
        variant="outlined"
      />

      <TextField
        label="Описание или заметки (необязательно)"
        rows={3}
        value={newTask.description}
        onChange={(e) => setDescriptionTask(e.target.value)}
        variant="outlined"
      />

      <Button variant="contained" fullWidth onClick={saveTask} sx={{ borderRadius: 3 }}>
        Сохранить
      </Button>
    </Stack>
  );
}

export default injectMobxStore('scheduleStore', TaskEditDialogContent);
