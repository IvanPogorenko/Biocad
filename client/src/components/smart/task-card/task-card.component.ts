import { Component } from '@angular/core';
import {SelectComponent} from '../../ui/select/select.component';

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

}
