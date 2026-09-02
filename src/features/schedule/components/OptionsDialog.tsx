import { Box, Typography, IconButton, Button, Paper, Grid, Dialog, DialogTitle, DialogContent, Avatar,TextField, Chip, Stack} from '@mui/material';
import { BarChart, Add, Close, LocationOn, AutoAwesome, ExpandMore, Message} from '@mui/icons-material';
import { useState } from 'react';
import theme from '../../../core/theme/darkTheme';
import { TaskModel } from '../models/TaskModel';
import { format } from 'date-fns/format';
import TaskCreateDialogContent from './TaskCreateDialogContent';

interface OptionsDialogProps {
    activeModal: string | null;
    setActiveModal: Function;
    selectedDate: Date | null;
    tasks: TaskModel;

    // TaskCreateProps
    newTaskTitle: string;
    setNewTaskTitle: (title: string) => void;
    newTaskDescription: string;
    setNewTaskDescription: (description: string) => void;
    newTaskType: string;
    setNewTaskType: (type: string) => void;
    handleSaveTask: () => void;
}

export default function OptionsDialog({activeModal, setActiveModal, selectedDate, tasks, newTaskTitle, setNewTaskTitle, newTaskDescription, setNewTaskDescription, newTaskType, setNewTaskType, handleSaveTask}: OptionsDialogProps) {
    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

    return (
      <Dialog open={activeModal !== null} onClose={() => setActiveModal(null)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{borderBottom: `1px solid ${theme.custom.border.light}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h6">
            {activeModal === 'task_create' ? 'Новое событие' :
             activeModal === 'tasks_list' ? 'События дня' :
             'Бронирование'}
          </Typography>

          <Stack direction="row" spacing={1}>
            {activeModal === 'tasks_list' && <IconButton size="small" onClick={() => setActiveModal('task_create')}><Add fontSize="small" color="primary"/></IconButton>}
            <IconButton size="small" onClick={() => setActiveModal(null)}><Close fontSize="small" /></IconButton>
          </Stack>
        </DialogTitle>

        <DialogContent dividers sx={{py: 3}}>
          {activeModal === 'tasks_list' ? (
            <Stack spacing={2}>
              {selectedDate && tasks[format(selectedDate, 'yyyy-MM-dd')]?.map((task) => (
                <Paper key={task.id} variant="outlined" sx={{p: 2, borderRadius: 3}}>
                  <Stack direction="row" sx={{justifyContent: "space-between", alignItems: "center"}}>
                    <Box>
                      <Chip label={task.type === 'встреча' ? 'Встреча' : 'Задача'} size="small" color={task.type === 'встреча' ? 'secondary' : 'primary'} sx={{mb: 0.5, fontSize: '0.6rem', height: 20}} />
                      <Typography variant="body2">{task.title}</Typography>
                    </Box>
                    
                    <IconButton size="small" onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}>
                      <ExpandMore sx={{transition: 'transform 0.2s', transform: expandedTaskId === task.id ? 'rotate(180deg)' : 'none'}} />
                    </IconButton>
                  </Stack>
                  {expandedTaskId === task.id && <Typography variant="body2" color="text.secondary" sx={{mt: 1, pt: 1, borderTop: `1px solid ${theme.custom.border.light}`}}>{task.description || 'Нет описания'}</Typography>}
                </Paper>
              ))}
            </Stack>
          ) : 
          
          activeModal === 'task_create' ? (
            <TaskCreateDialogContent newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle} newTaskDescription={newTaskDescription} setNewTaskDescription={setNewTaskDescription} newTaskType={newTaskType} setNewTaskType={setNewTaskType} handleSaveTask={handleSaveTask}/>
          ) : null}
        </DialogContent>
      </Dialog>
    );
}