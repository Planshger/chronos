import { TaskItem } from '../models/task_model';
import { format } from 'date-fns/format';
import TaskDialogContent from './task/TaskDialogContent';
import ScheduleStore from '../stores/ScheduleStore';
import injectMobxStore from '../../../shared/utils/injectMobxStore';

interface OptionsDialogProps {
  scheduleStore: ScheduleStore;
}

function OptionsDialog({ scheduleStore }: OptionsDialogProps) {
  const { activeModal, selectedDate, tasks } = scheduleStore;
  const dateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const dayTasks: TaskItem[] = tasks[dateKey] ?? [];

  return (
    <div>
      {activeModal === 'task_create' ||
      activeModal === 'tasks_list' ||
      activeModal === 'task_edit' ? (
        <TaskDialogContent dayTasks={dayTasks} />
      ) : null}
    </div>
  );
}

export default injectMobxStore('scheduleStore', OptionsDialog);
