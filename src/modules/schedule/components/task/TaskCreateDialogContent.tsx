import { initialTaskItem, TaskItem, TaskType } from '../../models/task_model';
import injectMobxStore from '../../../../shared/utils/injectMobxStore';
import { Button, Stack, TextField, useTheme } from '@mui/material';
import ScheduleStore from '../../stores/ScheduleStore';
import { SubmitEventHandler, useState } from 'react';

interface TaskCreateDialogContentProps {
  scheduleStore: ScheduleStore;
}

function TaskCreateDialogContent({ scheduleStore }: TaskCreateDialogContentProps) {
  const theme = useTheme();
  const [newTask, setNewTask] = useState<TaskItem>(initialTaskItem);

  const setTypeTask = (type: TaskType) => {
    setNewTask((prev) => ({ ...prev, type: type }));
  };

  const setTitleTask = (title: string) => {
    setNewTask((prev) => ({ ...prev, title: title }));
  };

  const setDescriptionTask = (description: string) => {
    setNewTask((prev) => ({ ...prev, description: description }));
  };
  const saveTask: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    scheduleStore.handleSaveTask(newTask);
  };

  return (
    <form onSubmit={(e) => saveTask(e)}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={1} sx={{ bgcolor: theme.palette.action.hover, p: 0.5, borderRadius: 3 }}>
          <Button
            type="button"
            fullWidth
            variant={newTask.type === TaskType.Task ? 'contained' : 'text'}
            onClick={() => setTypeTask(TaskType.Task)}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Задача
          </Button>

          <Button
            type="button"
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
          required
        />

        <TextField
          label="Описание или заметки (необязательно)"
          rows={3}
          value={newTask.description}
          onChange={(e) => setDescriptionTask(e.target.value)}
          variant="outlined"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: 3 }}>
          Сохранить
        </Button>
      </Stack>
    </form>
  );
}

export default injectMobxStore('scheduleStore', TaskCreateDialogContent);
