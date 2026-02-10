import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {ITask} from '../../store/models/task.model';
import {Store} from '@ngrx/store';
import {loadTasks, loadTasksFailure, loadTasksSuccess} from '../../store/actions/task.actions';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  constructor(
    private _httpClient: HttpClient,
    private _store: Store
  ) { }

  public getTasks() {
    this._store.dispatch(loadTasks())
    this._httpClient.get<ITask[]>('/tasks').pipe(
      catchError(error => {
        const errorMessage = error.message || 'Failed to load tasks'
        this._store.dispatch(loadTasksFailure({error: errorMessage}))
        return throwError(() => new Error(errorMessage))
      })
    ).subscribe({
      next: (tasks) => {
        this._store.dispatch(loadTasksSuccess({tasks}))
      }
    })
  }
}
