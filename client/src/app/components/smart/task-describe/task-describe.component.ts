import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ITaskExtends} from '../../../store/models/task-extends.model';
import {combineLatest, Subscription} from 'rxjs';
import {selectTaskError, selectTaskExtends, selectTaskLoading} from '../../../store/selectors/task-extends.selector';

@Component({
  selector: 'app-task-describe',
  standalone: true,
  imports: [],
  templateUrl: './task-describe.component.html',
  styleUrl: './task-describe.component.scss'
})
export class TaskDescribeComponent implements OnInit, OnDestroy{

  constructor(
    private _store: Store
  ) {
  }

  private storeSub!: Subscription

  public task: ITaskExtends | null = null
  public loading = false
  public error: string | null = null

  ngOnInit() {
    this.subscribeToStore()
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe()
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
        console.error('Error from store:', error)
      }
    });
  }

}
