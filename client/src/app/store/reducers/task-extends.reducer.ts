import {ITaskExtends, TaskExtendState} from '../models/task-extends.model';
import {createReducer, on} from '@ngrx/store';
import {loadTaskExtends, loadTaskExtendsFailure, loadTaskExtendsSuccess} from '../actions/task-extends.action';

const initialTask: ITaskExtends = {
  task: {
    id: 0,
    name: '',
    number: '',
    status: '',
    location: '',
    warnings: 0,
    alerts: 0,
    icon: ''
  },
  description: {
    ERP: '',
    series: 0,
    passportId: 0,
    EO: 0,
    class: '',
    producer: ''
  },
  experiments: []
}

export const initialState: TaskExtendState = {
  task: initialTask,
  loading: false,
  error: null
};

export const taskExtendsReducer = createReducer(
  initialState,

  on(loadTaskExtends, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loadTaskExtendsSuccess, (state, { task }) => ({
    ...state,
    task: task,
    loading: false,
    error: null
  })),

  on(loadTaskExtendsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
)
