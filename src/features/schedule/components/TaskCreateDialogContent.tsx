import { Button, Stack, TextField } from "@mui/material";
import theme from "../../../core/theme/darkTheme";

interface TaskCreateDialogContentProps {
    newTaskTitle: string;
    setNewTaskTitle: (title: string) => void;
    newTaskDescription: string;
    setNewTaskDescription: (description: string) => void;
    newTaskType: string;
    setNewTaskType: (type: string) => void;
    handleSaveTask: () => void;
}

export default function TaskCreateDialogContent({newTaskTitle, setNewTaskTitle, newTaskDescription, setNewTaskDescription, newTaskType, setNewTaskType, handleSaveTask}: TaskCreateDialogContentProps) {
    return (
        <Stack spacing={3}>
              <Stack direction="row" spacing={1} sx={{bgcolor: theme.palette.action.hover, p: 0.5, borderRadius: 3}}>
                <Button fullWidth variant={newTaskType === 'задача' ? 'contained' : 'text'} onClick={() => setNewTaskType('задача')} sx={{borderRadius: 2, textTransform: 'none'}}>Задача</Button>
                <Button fullWidth variant={newTaskType === 'встреча' ? 'contained' : 'text'} onClick={() => setNewTaskType('встреча')} sx={{borderRadius: 2, textTransform: 'none'}}>Встреча</Button>
              </Stack>

              <TextField label={newTaskType === 'задача' ? 'Название задачи' : 'Тема встречи'} value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} variant="outlined"/>

              <TextField label="Описание или заметки (необязательно)" rows={3} value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} variant="outlined" />
                
              <Button variant="contained" fullWidth onClick={handleSaveTask} sx={{borderRadius: 3}}>Сохранить</Button>
        </Stack>
    );
}