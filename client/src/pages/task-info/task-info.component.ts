import {Component, OnInit} from '@angular/core';
import {SelectComponent} from '../../components/ui/select/select.component';
import {TaskDescribeComponent} from '../../components/smart/task-describe/task-describe.component';
import {ActivatedRoute, Route, Router, RouterLink, RouterOutlet} from '@angular/router';
import {RoutingService} from '../../app/routing.service';
import {TASK_SUB_PATHS} from '../../app/app.paths';

@Component({
  selector: 'app-task-info',
  standalone: true,
  imports: [
    SelectComponent,
    TaskDescribeComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './task-info.component.html',
  styleUrl: './task-info.component.scss'
})
export class TaskInfoComponent {

  constructor(
    private _routingService: RoutingService,
    private _router: Router
  ) {
  }

  public tabs = {
    analytics: TASK_SUB_PATHS.Analytics,
    describe: TASK_SUB_PATHS.Describe
  }
  public activeTab = this.tabs.describe

  public swapTabs(tab: string){
    if (tab === this.tabs.analytics){
      this._routingService.navigateToTaskAnalytics(12)
    } else {
      this._routingService.navigateToTaskDescribe(12)
    }
    this.swapActiveBtn(tab)
  }

  public swapActiveBtn(tab: string){
    this.activeTab = tab
  }

}
