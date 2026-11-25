import injectMobxStore from '../../../shared/utils/injectMobxStore';
import TaskDialogContent from './task/TaskDialogContent';
import { ScheduleModal } from '../stores/ScheduleStore';
import ScheduleStore from '../stores/ScheduleStore';
import { TaskItem } from '../models/task_model';
import { format } from 'date-fns/format';

interface OptionsDialogProps {
  scheduleStore: ScheduleStore;
}

function OptionsDialog({ scheduleStore }: OptionsDialogProps) {
  const { activeModal, selectedDate, tasks } = scheduleStore;
  const dateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const dayTasks: TaskItem[] = tasks[dateKey] ?? [];

  return (
    <div>
      {activeModal === ScheduleModal.TaskCreate ||
        activeModal === ScheduleModal.TasksList ||
        (activeModal === ScheduleModal.TaskEdit && <TaskDialogContent dayTasks={dayTasks} />)}
    </div>
  );
}

export default injectMobxStore('scheduleStore', OptionsDialog);
