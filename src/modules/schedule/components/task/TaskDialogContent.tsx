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
import { initialTaskItem, TaskItem } from '../../models/task_model';
import { useEffect, useState } from 'react';
import { useLoading, useSchedule } from '../../ScheduleModule';
import Loader from '../../../../shared/ui/Loader';
import TaskEditDialogContent from './TaskEditDialogContent';

interface TaskDialogContentProps {
  dayTasks: TaskItem[];
}

export default function TaskDialogContent({ dayTasks }: TaskDialogContentProps) {
  const theme = useTheme();
  const { activeModal, setActiveModal, onDeleteTasks } = useSchedule();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedTaskId, setExpandedTaskId] = useState<string>();
  const [editedTask, setEditedTask] = useState<string>();

  const allSelected = dayTasks.length > 0 && selectedIds.length === dayTasks.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const { loading } = useLoading();

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
        setActiveModal(null);
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
        {activeModal === 'task_create'
          ? 'Новое событие'
          : activeModal === 'tasks_list'
            ? 'События дня'
            : activeModal === 'task_edit'
              ? 'Редактирование'
              : ''}

        <Stack direction="row" spacing={1}>
          {activeModal === 'tasks_list' && selectedIds.length > 0 && (
            <Button
              size="small"
              color="error"
              startIcon={<Delete fontSize="small" />}
              onClick={() => {
                onDeleteTasks(selectedIds);
                setSelectedIds([]);
              }}
            >
              Удалить ({selectedIds.length})
            </Button>
          )}

          {activeModal === 'tasks_list' && (
            <IconButton size="small" onClick={() => setActiveModal('task_create')}>
              <Add fontSize="small" color="primary" />
            </IconButton>
          )}

          <IconButton size="small" onClick={() => setActiveModal(null)}>
            <Close fontSize="small" sx={{ color: 'grey.500' }} />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        {activeModal === 'tasks_list' ? (
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
                        label={task.type === 'встреча' ? 'Встреча' : 'Задача'}
                        size="small"
                        color={task.type === 'встреча' ? 'secondary' : 'primary'}
                        sx={{ mb: 0.5, fontSize: '0.6rem', height: 20 }}
                      />

                      <Typography variant="body2">{task.title}</Typography>
                    </Box>
                  </Stack>

                  <IconButton
                    className="edit-button"
                    size="small"
                    onClick={(e) => {
                      setActiveModal('task_edit');
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
        ) : activeModal === 'task_create' ? (
          <TaskCreateDialogContent />
        ) : activeModal === 'task_edit' ? (
          <TaskEditDialogContent
            task={dayTasks.find((i) => i.id === editedTask) ?? initialTaskItem}
          />
        ) : null}
      </DialogContent>
      {loading && <Loader size={80} />}
    </Dialog>
  );
}
