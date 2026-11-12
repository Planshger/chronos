import { TaskItem } from '../models/task_model';
import { format } from 'date-fns/format';
import TaskDialogContent from './task/TaskDialogContent';
import ScheduleStore from '../stores/ScheduleStore';
import { ScheduleModal } from '../stores/ScheduleStore';
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
      {activeModal === ScheduleModal.TaskCreate ||
      activeModal === ScheduleModal.TasksList ||
      activeModal === ScheduleModal.TaskEdit ? (
        <TaskDialogContent dayTasks={dayTasks} />
      ) : null}
    </div>
  );
}

export default injectMobxStore('scheduleStore', OptionsDialog);
