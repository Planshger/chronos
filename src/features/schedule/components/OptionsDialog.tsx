import { Task, TaskItem } from '../models/task_model';
import { format } from 'date-fns/format';
import TaskDialogContent from './task/TaskDialogContent';
import { useSchedule } from '../Schedule';


export default function OptionsDialog() {
  const {activeModal, selectedDate, tasks} = useSchedule();
  const dateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const dayTasks: TaskItem[] = tasks[dateKey] ?? [] as TaskItem[];

  return (
    <div>
      {activeModal === 'task_create' || activeModal === 'tasks_list' || activeModal === 'task_edit' ? 
        <TaskDialogContent  dayTasks={dayTasks}/> : null
      }
    </div>
  );
}