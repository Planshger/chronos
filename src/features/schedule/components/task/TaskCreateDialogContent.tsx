import { Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { initialTaskItem, TaskItem } from '../../models/task_model';
import theme from '../../../../core/theme/darkTheme';
import { useSchedule } from '../../Schedule';

export default function TaskCreateDialogContent() {
  const { handleSaveTask } = useSchedule();
  const [newTask, setNewTask] = useState<TaskItem>(initialTaskItem);

  return (
    <Stack spacing={3}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ bgcolor: theme.palette.action.hover, p: 0.5, borderRadius: 3 }}
      >
        <Button
          fullWidth
          variant={newTask.type === 'задача' ? 'contained' : 'text'}
          onClick={() => setNewTask((prev) => ({ ...prev, type: 'задача' }))}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Задача
        </Button>

        <Button
          fullWidth
          variant={newTask.type === 'встреча' ? 'contained' : 'text'}
          onClick={() => setNewTask((prev) => ({ ...prev, type: 'встреча' }))}
          sx={{ borderRadius: 2, textTransform: 'none' }}
        >
          Встреча
        </Button>
      </Stack>

      <TextField
        label={newTask.type === 'задача' ? 'Название задачи' : 'Тема встречи'}
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
        onClick={() => handleSaveTask(newTask)}
        sx={{ borderRadius: 3 }}
      >
        Сохранить
      </Button>
    </Stack>
  );
}
