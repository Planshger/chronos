import { useState } from 'react';
import { TaskItem, TaskType } from '../../models/task_model';
import { Button, Stack, TextField, useTheme } from '@mui/material';
import ScheduleStore from '../../stores/ScheduleStore';
import injectMobxStore from '../../../../shared/utils/injectMobxStore';

interface TaskEditDialogContentProps {
  task: TaskItem;
  scheduleStore: ScheduleStore;
}

function TaskEditDialogContent({ task, scheduleStore }: TaskEditDialogContentProps) {
  const theme = useTheme();
  const [newTask, setNewTask] = useState<TaskItem>(task);

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ bgcolor: theme.palette.action.hover, p: 0.5, borderRadius: 3 }}
      >
        <Button
          fullWidth
          variant={newTask.type === TaskType.Task ? 'contained' : 'text'}
          onClick={() => setNewTask((prev) => ({ ...prev, type: TaskType.Task }))}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Задача
        </Button>

        <Button
          fullWidth
          variant={newTask.type === TaskType.Meeting ? 'contained' : 'text'}
          onClick={() => setNewTask((prev) => ({ ...prev, type: TaskType.Meeting }))}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Встреча
        </Button>
      </Stack>

      <TextField
        label={newTask.type === TaskType.Task ? 'Название задачи' : 'Тема встречи'}
        value={newTask.title}
        onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
        variant="outlined"
      />

      <TextField
        label="Описание или заметки (необязательно)"
        rows={3}
        value={newTask.description}
        onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
        variant="outlined"
      />

      <Button
        variant="contained"
        fullWidth
        onClick={() => scheduleStore.handleEditTask(newTask)}
        sx={{ borderRadius: 3 }}
      >
        Сохранить
      </Button>
    </Stack>
  );
}

export default injectMobxStore('scheduleStore', TaskEditDialogContent);
