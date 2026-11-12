import {
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { Add, Close, Delete, Edit, ExpandMore } from '@mui/icons-material';
import TaskCreateDialogContent from './TaskCreateDialogContent';
import { initialTaskItem, TaskItem, TaskType } from '../../models/task_model';
import { useEffect, useState } from 'react';
import ScheduleStore from '../../stores/ScheduleStore';
import { ScheduleModal } from '../../stores/ScheduleStore';
import injectMobxStore from '../../../../shared/utils/injectMobxStore';
import TaskEditDialogContent from './TaskEditDialogContent';
import Loader from '../../../../shared/ui/Loader';

interface TaskDialogContentProps {
  dayTasks: TaskItem[];
  scheduleStore: ScheduleStore;
}

function TaskDialogContent({ dayTasks, scheduleStore }: TaskDialogContentProps) {
  const theme = useTheme();
  const { activeModal } = scheduleStore;
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedTaskId, setExpandedTaskId] = useState<string>();
  const [editedTask, setEditedTask] = useState<string>();

  const allSelected = dayTasks.length > 0 && selectedIds.length === dayTasks.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const toggleAll = () => {
    setSelectedIds(selectedIds.length > 0 ? [] : dayTasks.map((t) => t.id));
  };

  const toggleOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  useEffect(() => {
    setSelectedIds([]);
    setExpandedTaskId(undefined);
  }, [activeModal]);

  return (
    <Dialog
      open={activeModal !== null}
      onClose={(reason) => {
        if (reason !== 'backdropClick') return;
        scheduleStore.setActiveModal(null);
      }}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        sx={{
          borderBottom: `1px solid ${theme.custom.border.light}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {activeModal === ScheduleModal.TaskCreate
          ? 'Новое событие'
          : activeModal === ScheduleModal.TasksList
            ? 'События дня'
            : activeModal === ScheduleModal.TaskEdit
              ? 'Редактирование'
              : ''}

        <Stack direction="row" spacing={1}>
          {activeModal === ScheduleModal.TasksList && selectedIds.length > 0 && (
            <Button
              size="small"
              color="error"
              startIcon={<Delete fontSize="small" />}
              onClick={() => {
                scheduleStore.onDeleteTasks(selectedIds);
                setSelectedIds([]);
              }}
            >
              Удалить ({selectedIds.length})
            </Button>
          )}

          {activeModal === ScheduleModal.TasksList && (
            <IconButton
              size="small"
              onClick={() => scheduleStore.setActiveModal(ScheduleModal.TaskCreate)}
            >
              <Add fontSize="small" color="primary" />
            </IconButton>
          )}

          <IconButton size="small" onClick={() => scheduleStore.setActiveModal(null)}>
            <Close fontSize="small" sx={{ color: 'grey.500' }} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        {activeModal === ScheduleModal.TasksList ? (
          <Stack spacing={2}>
            {dayTasks.length > 0 && (
              <FormControlLabel
                label={allSelected || someSelected ? 'Снять выделение' : 'Выбрать все'}
                control={
                  <Checkbox
                    size="small"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={() => toggleAll()}
                  />
                }
              />
            )}

            {dayTasks.map((task) => (
              <Paper key={task.id} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Checkbox
                      size="small"
                      checked={selectedIds.includes(task.id)}
                      onChange={(e) => toggleOne(task.id, e.target.checked)}
                    />

                    <Box>
                      <Chip
                        label={task.type === TaskType.Meeting ? 'Встреча' : 'Задача'}
                        size="small"
                        color={task.type === TaskType.Meeting ? 'secondary' : 'primary'}
                        sx={{ mb: 0.5, fontSize: '0.6rem', height: 20 }}
                      />

                      <Typography variant="body2">{task.title}</Typography>
                    </Box>
                  </Stack>

                  <IconButton
                    className="edit-button"
                    size="small"
                    onClick={(e) => {
                      scheduleStore.setActiveModal(ScheduleModal.TaskEdit);
                      setEditedTask(task.id);
                    }}
                    sx={{ position: 'absolute', right: 50 }}
                  >
                    <Edit fontSize="small" sx={{ color: theme.palette.text.primary }} />
                  </IconButton>

                  <IconButton
                    size="small"
                    onClick={() => setExpandedTaskId(expandedTaskId === task.id ? '' : task.id)}
                  >
                    <ExpandMore
                      sx={{
                        transition: 'transform 0.2s',
                        transform: expandedTaskId === task.id ? 'rotate(180deg)' : 'none',
                        color: 'grey.500',
                      }}
                    />
                  </IconButton>
                </Stack>

                {expandedTaskId === task.id && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, pt: 1, borderTop: `1px solid ${theme.custom.border.light}` }}
                  >
                    {task.description || 'Нет описания'}
                  </Typography>
                )}
              </Paper>
            ))}
          </Stack>
        ) : activeModal === ScheduleModal.TaskCreate ? (
          <TaskCreateDialogContent />
        ) : activeModal === ScheduleModal.TaskEdit ? (
          <TaskEditDialogContent
            task={dayTasks.find((i) => i.id === editedTask) ?? initialTaskItem}
          />
        ) : null}

        {scheduleStore.loading && <Loader size={80} />}
      </DialogContent>
    </Dialog>
  );
}

export default injectMobxStore('scheduleStore', TaskDialogContent);
