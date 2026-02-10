export interface ITask {
  id: number,
  name: string,
  number: string,
  status: string,
  location: string,
  warnings: number,
  alerts: number,
  icon: string
}

export interface TasksState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}
