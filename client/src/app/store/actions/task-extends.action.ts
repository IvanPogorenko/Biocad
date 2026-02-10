import {createAction, props} from '@ngrx/store';
import {ITaskExtends} from '../models/task-extends.model';

export const loadTaskExtends = createAction('[Task] Load Task-Extends');

export const loadTaskExtendsSuccess = createAction(
  '[Task] Load Task-Extends Success',
  props<{ task: ITaskExtends }>()
);

export const loadTaskExtendsFailure = createAction(
  '[Task] Load Task-Extends Failure',
  props<{ error: string }>()
);
