import { Component } from '@angular/core';
import {SelectComponent} from '../../ui/select/select.component';
import {RoutingService} from '../../../app/routing.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    SelectComponent
  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  constructor(
    private _routingService: RoutingService
  ) {
  }

  public toTaskInfo(event: Event){
    const target = event.target as HTMLElement
    const select = target.closest('app-select')
    if (!select){
      this._routingService.navigateToTask(12)
    }
  }

}
