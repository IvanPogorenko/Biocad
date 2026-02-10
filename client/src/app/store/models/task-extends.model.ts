import {ITask} from './task.model';

export interface ITaskExtends{
  task: ITask,
  description: Description,
  experiments: Experiments[]
}

export interface Description{
  ERP: string,
  series: number,
  passportId: number,
  EO: number,
  class: string,
  producer: string
}

export interface Experiments{
  date: Date,
  time: string,
  status: string,
  info: string,
  user_name: string
}

export interface TaskExtendState {
  task: ITaskExtends;
  loading: boolean;
  error: string | null;
}
