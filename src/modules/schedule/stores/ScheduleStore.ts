import { addMonths, format, subMonths } from 'date-fns';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  addTask,
  editTask,
  getUserTasksByUserId,
  updateTasksData,
} from '../datasources/task_data_source';
import { initialTaskModel, Task, TaskItem, TaskModel } from '../models/task_model';

type ShowError = (error: unknown) => void;

export default class ScheduleStore {
  taskData: TaskModel = { ...initialTaskModel, tasks: {} };
  currentMonth = new Date();
  selectedDate: Date | null = null;
  activeModal: string | null = null;
  isSchedulingOpen = false;
  loading = false;
  private userId: number | null = null;
  private requestId = 0;

  constructor(private readonly showError: ShowError) {
    makeAutoObservable<ScheduleStore, 'showError' | 'requestId'>(
      this,
      {
        showError: false,
        requestId: false,
      },
      { autoBind: true },
    );
  }

  get tasks(): Task {
    return this.taskData.tasks ?? {};
  }

  get selectedDateKey(): string | null {
    return this.selectedDate ? format(this.selectedDate, 'yyyy-MM-dd') : null;
  }

  setUserId(userId: number | null): void {
    if (this.userId === userId) return;

    this.userId = userId;
    this.requestId += 1;
    this.loading = false;
    this.taskData = { ...initialTaskModel, userId: userId ?? 0, tasks: {} };
    this.selectedDate = null;
    this.activeModal = null;
    this.isSchedulingOpen = false;

    if (userId !== null) {
      this.loadTasks();
    }
  }

  setActiveModal(name: string | null): void {
    this.activeModal = name;
  }

  selectDate(date: Date | null, isMobile: boolean): void {
    this.selectedDate = date;
    if (isMobile && date) this.isSchedulingOpen = true;
  }

  closeScheduling(): void {
    this.isSchedulingOpen = false;
  }

  nextMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, 1);
  }

  prevMonth(): void {
    this.currentMonth = subMonths(this.currentMonth, 1);
  }

  async loadTasks(): Promise<void> {
    const userId = this.userId;
    if (userId === null) return;

    await this.runRequest(
      () => getUserTasksByUserId(userId),
      (result) => {
        this.taskData = result;
      },
      userId,
    );
  }

  async handleSaveTask(task: TaskItem): Promise<void> {
    const dateKey = this.selectedDateKey;
    const userId = this.userId;
    if (!dateKey || !this.activeModal || userId === null) return;

    await this.runRequest(
      () => addTask(dateKey, { ...task, id: crypto.randomUUID() }, this.taskData, userId),
      (result) => {
        this.taskData = result;
        this.activeModal = 'tasks_list';
      },
      userId,
    );
  }

  async handleEditTask(task: TaskItem): Promise<void> {
    const dateKey = this.selectedDateKey;
    const userId = this.userId;
    if (!dateKey || !this.activeModal || userId === null) return;

    await this.runRequest(
      () => editTask(dateKey, task, this.taskData),
      (result) => {
        this.taskData = result;
        this.activeModal = 'tasks_list';
      },
      userId,
    );
  }

  async onDeleteTasks(ids: string[]): Promise<void> {
    const dateKey = this.selectedDateKey;
    const userId = this.userId;
    if (!dateKey || userId === null) return;

    const dayTasks = (this.tasks[dateKey] ?? []).filter((task) => !ids.includes(task.id));

    await this.runRequest(
      () =>
        updateTasksData({
          ...this.taskData,
          tasks: {
            ...this.tasks,
            [dateKey]: dayTasks,
          },
        }),
      (result) => {
        this.taskData = result;
        this.activeModal = null;
      },
      userId,
    );
  }

  private async runRequest<T>(
    request: () => Promise<T>,
    onSuccess: (result: T) => void,
    userId: number,
  ): Promise<void> {
    const requestId = ++this.requestId;
    this.loading = true;

    try {
      const result = await request();
      runInAction(() => {
        if (this.requestId === requestId && this.userId === userId) {
          onSuccess(result);
        }
      });
    } catch (error) {
      if (this.requestId === requestId && this.userId === userId) {
        this.showError(error);
      }
    } finally {
      runInAction(() => {
        if (this.requestId === requestId) this.loading = false;
      });
    }
  }
}
