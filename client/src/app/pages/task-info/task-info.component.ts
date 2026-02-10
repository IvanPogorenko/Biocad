import {Component, OnDestroy, OnInit} from '@angular/core';
import {SelectComponent} from '../../components/ui/select/select.component';
import {TaskDescribeComponent} from '../../components/smart/task-describe/task-describe.component';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {RoutingService} from '../../routing.service';
import {TASK_SUB_PATHS} from '../../app.paths';
import {TaskInfoService} from './task-info.service';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {ITaskExtends} from '../../store/models/task-extends.model';
import {Store} from '@ngrx/store';
import {selectTaskError, selectTaskExtends, selectTaskLoading} from '../../store/selectors/task-extends.selector';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [
    SelectComponent,
    TaskDescribeComponent,
    RouterOutlet,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.scss'
})
export class TaskInfoComponent implements OnInit, OnDestroy{

  constructor(
    private _taskInfoService: TaskInfoService,
    private _routingService: RoutingService,
    private _activatedRoute: ActivatedRoute,
    private _store: Store
  ) {
  }

  public task: ITaskExtends | null = null
  public loading = false
  public error: string | null = null

  public tabs = {
    analytics: TASK_SUB_PATHS.Analytics,
    describe: TASK_SUB_PATHS.Describe
  }
  public activeTab = this.tabs.describe

  private _taskId = -1
  private routeSub!: Subscription;
  private storeSub!: Subscription;

  ngOnInit() {
    this.routeSub = this._activatedRoute.params.subscribe(params => {
      this._taskId = params['id']
    })
    if (this._taskId > 0){
      this.subscribeToStore()
      this._taskInfoService.getTaskExtends(this._taskId)
    }
  }

  private subscribeToStore(): void {
    this.storeSub = combineLatest([
      this._store.select(selectTaskExtends),
      this._store.select(selectTaskLoading),
      this._store.select(selectTaskError)
    ]).subscribe(([task, loading, error]) => {
      this.task = task
      this.loading = loading
      this.error = error
      if (error) {
        console.error('Error from store in task-info:', error)
      }
    });
  }


  ngOnDestroy() {
    if (this.routeSub){
      this.routeSub.unsubscribe()
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe()
    }
  }

  public swapTabs(tab: string){
    if (tab === this.tabs.analytics){
      this._routingService.navigateToTaskAnalytics(this._taskId)
    } else {
      this._routingService.navigateToTaskDescribe(this._taskId)
    }
    this.swapActiveBtn(tab)
  }

  public swapActiveBtn(tab: string){
    this.activeTab = tab
  }

  public statusChanged(status: string){

  }

}
