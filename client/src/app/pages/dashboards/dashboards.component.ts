import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskCardComponent} from '../../components/smart/task-card/task-card.component';
import {DashboardsService} from './dashboards.service';
import {AsyncPipe, NgForOf} from '@angular/common';
import {ITask} from '../../store/models/task.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectAllTasks, selectTasksError, selectTasksLoading} from '../../store/selectors/task.selector';

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [
    TaskCardComponent,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent implements OnInit{

  constructor(
    private _dashboardService: DashboardsService,
    private _store: Store
  ){
    this.tasks$ = this._store.select(selectAllTasks)
    this.loading$ = this._store.select(selectTasksLoading)
    this.error$ = this._store.select(selectTasksError)
  }

  public tasks$: Observable<ITask[]>
  public loading$: Observable<boolean>
  public error$: Observable<string | null>

  ngOnInit() {
    this._dashboardService.getTasks()

  }

}
