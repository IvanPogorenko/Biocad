import {TasksState} from '../models/task.model';
import {createReducer, on} from '@ngrx/store';
import {loadTasks, loadTasksFailure, loadTasksSuccess} from '../actions/task.actions';

export const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null
};

export const tasksReducer = createReducer(
  initialState,

  on(loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks: tasks,
    loading: false,
    error: null
  })),

  on(loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
