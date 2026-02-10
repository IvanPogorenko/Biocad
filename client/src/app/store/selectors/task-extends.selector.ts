import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TaskExtendState} from '../models/task-extends.model';

export const selectTaskState = createFeatureSelector<TaskExtendState>('task-extends');

export const selectTaskExtends = createSelector(
  selectTaskState,
  (state) => state.task
);

export const selectTaskLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

export const selectTaskError = createSelector(
  selectTaskState,
  (state) => state.error
);
