import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {ITaskExtends} from '../../store/models/task-extends.model';
import {Store} from '@ngrx/store';
import {loadTaskExtends, loadTaskExtendsFailure, loadTaskExtendsSuccess} from '../../store/actions/task-extends.action';

@Injectable({
  providedIn: 'root'
})
export class TaskInfoService {

  constructor(
    private _httpClient: HttpClient,
    private _store: Store
  ) { }

  public getTaskExtends(id: number) {
    this._store.dispatch(loadTaskExtends())
    this._httpClient.get<ITaskExtends>(`/task-extended-info/${id}`).pipe(
      catchError(error => {
        const errorMessage = error.message || 'Failed to load tasks'
        this._store.dispatch(loadTaskExtendsFailure({error: errorMessage}))
        return throwError(() => new Error(errorMessage))
      })
    ).subscribe({
      next: (task) => {
        this._store.dispatch(loadTaskExtendsSuccess({task}))
      }
    })
  }
}
