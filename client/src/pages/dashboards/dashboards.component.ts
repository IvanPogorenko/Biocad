import { Component } from '@angular/core';
import {TaskCardComponent} from '../../components/smart/task-card/task-card.component';

@Component({
  selector: 'app-dashboards',
  standalone: true,
  imports: [
    TaskCardComponent
  ],
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent {

}
